import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoClient } from "mongodb";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import connect_db from "@/app/config/db";
import removeMarkdown from "remove-markdown"; // Install this package: npm install remove-markdown

// ✅ Load Environment Variables
const MONGO_URI: string = process.env.DB_URI || "";
const DB_NAME: string = process.env.DB_NAME || "";
const GOOGLE_API_KEY: string = process.env.GEMINI_KEY || "";

// ✅ Ensure required environment variables are present
if (!MONGO_URI || !DB_NAME) {
  throw new Error("MongoDB configuration is missing.");
}

if (!GOOGLE_API_KEY) {
  console.warn("Warning: Google API Key is missing. Some features may not work.");
}

// ✅ Initialize Google Gemini Model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: GOOGLE_API_KEY,
});

// ✅ Use Google Embeddings Instead of OpenAI
const embeddingModel = new GoogleGenerativeAIEmbeddings({
  modelName: "embedding-001",
  apiKey: GOOGLE_API_KEY,
});

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
async function loadAndStoreData(): Promise<Chroma> {
  try {
    await connect_db();
    const client = await getMongoClient();
    const db = client.db(DB_NAME);
    const collection = db.collection("articles");

    const docs = await collection.find({}).toArray();
    const texts = docs.map((doc) => doc.content || "");
    const metadata = docs.map((doc) => ({ id: doc._id.toString() }));

    return await Chroma.fromTexts(texts, metadata, embeddingModel, {
      collectionName: "articles_vectorstore",
      url: process.env.CHROMA_DB_URL_EC2
    });
  } catch (error) {
    console.error("Error loading and storing data:", error);
    throw new Error("Failed to process database data.");
  }
}

// ✅ GET API Endpoint
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const query = req.nextUrl.searchParams.get("query");
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const vectorDB = await loadAndStoreData();
    const relatedDocs = await vectorDB.similaritySearch(query, 3);

    // Process related documents
    const articles = relatedDocs.map((doc) => {
      const cleanContent = removeMarkdown(doc.pageContent);
      const articleLink = `${process.env.NEXT_PUBLIC_SITE_URL}/article/${doc.metadata.id || doc.metadata._id}`;
      return {
        content: cleanContent,
        link: articleLink
      };
    });
    const context = articles.map((article) => `${article.content}`).join("\n\n");
    const relatedLinks = articles?.map((article) => article?.link) || [];

    const prompt = `Context: ${context}\n\nUser: ${query}\nAI: `;
    const response = await model.invoke(prompt);

    // 👉 Now returning both 'answer' and 'articles'
    return NextResponse.json(
      {
        answer: response,
        articles: relatedLinks, // Include articles separately
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
