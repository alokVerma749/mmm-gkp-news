import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import connect_db from "@/app/config/db";

// ✅ Load Environment Variables
const MONGO_URI: string = process.env.DB_URI || "";
const DB_NAME: string = process.env.DB_NAME || "";
const GOOGLE_API_KEY: string = process.env.GEMINI_KEY || "";
const CHROMA_DB_URL: string = process.env.CHROMA_DB_URL_EC2 || "";

// ✅ Ensure required environment variables are present
if (!MONGO_URI || !DB_NAME) {
  throw new Error("MongoDB configuration is missing.");
}

if (!GOOGLE_API_KEY) {
  console.warn("Warning: Google API Key is missing. Some features may not work.");
}

// ✅ MongoDB Connection (Singleton Pattern)
let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();
  }
  return mongoClient;
}

// ✅ Load Data and Store Embeddings
async function loadAndStoreData(): Promise<any> {
  try {
    const { GoogleGenerativeAIEmbeddings } = await import("@langchain/google-genai");
    const { Chroma } = await import("@langchain/community/vectorstores/chroma");

    const embeddingModel = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-001",
      apiKey: GOOGLE_API_KEY,
    });

    await connect_db();
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
    const collection = db.collection("articles");

    const docs = await collection.find({}).toArray();
    const texts: string[] = docs.map((doc) => doc.content || "");
    const metadata = docs.map((doc) => ({ id: doc._id.toString() }));

    return await Chroma.fromTexts(texts, metadata, embeddingModel, {
      collectionName: "articles_vectorstore",
      url: CHROMA_DB_URL,
    });
  } catch (error) {
    console.error("Error loading and storing data:", error);
    throw new Error("Failed to process database data.");
  }
}

// ✅ GET API Endpoint
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query: string | null = req.nextUrl.searchParams.get("query");
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // ✅ Lazy import (since top-level await is not allowed in Next.js API routes)
    const { ChatGoogleGenerativeAI } = await import("@langchain/google-genai");

    // ✅ Initialize Google Gemini Model
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: GOOGLE_API_KEY,
    });

    const vectorDB = await loadAndStoreData();
    const relatedDocs = await vectorDB.similaritySearch(query, 3);

    const context: string = relatedDocs.map((doc: any) => doc.content || "").join("\n");

    const prompt = `Context: ${context}\n\nUser: ${query}\nAI: `;
    const response = await model.invoke(prompt);

    return NextResponse.json({ answer: response }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
