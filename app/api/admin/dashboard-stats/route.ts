import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET(request: Request) {
  try {
    // Extract the auth_token from the incoming request cookies
    const authToken = request.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];

    if (!authToken) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    // Define headers with the auth_token
    const headers = {
      "Content-Type": "application/json",
      Cookie: `auth_token=${authToken}`,
    };

    // Fetch tasks to count pending ones
    const tasksResponse = await fetch(`${baseUrl}/api/admin/tasks`, {
      method: "GET",
      headers,
    });
    const tasks = await tasksResponse.json();
    const pendingTasks = Array.isArray(tasks) ? tasks.filter((task) => !task.completed).length : 0;

    // Fetch events
    const eventsResponse = await fetch(`${baseUrl}/api/admin/events`, {
      method: "GET",
      headers,
    });
    const events = await eventsResponse.json();
    const pendingEvents = Array.isArray(events) ? events.length : 0;

    // Fetch articles
    const articlesResponse = await fetch(`${baseUrl}/api/admin/articles`, {
      method: "GET",
      headers,
    });
    const articles = await articlesResponse.json();
    const totalArticles = Array.isArray(articles) ? articles.length : 0;

    // Fetch contacts
    const contactsResponse = await fetch(`${baseUrl}/api/admin/contacts`, {
      method: "GET",
      headers,
    });
    const contacts = await contactsResponse.json();
    const totalContacts = Array.isArray(contacts) ? contacts.length : 0;

    // Fetch complaints
    const complaintsResponse = await fetch(`${baseUrl}/api/admin/complaints`, {
      method: "GET",
      headers,
    });
    const complaints = await complaintsResponse.json();
    const totalComplaints = Array.isArray(complaints) ? complaints.length : 0;

    // Fetch surveys
    const surveysResponse = await fetch(`${baseUrl}/api/admin/surveys`, {
      method: "GET",
      headers,
    });
    const surveys = await surveysResponse.json();
    const totalSurveys = Array.isArray(surveys) ? surveys.length : 0;

    // Return all stats
    return NextResponse.json({
      articles: totalArticles,
      pendingTasks,
      pendingEvents,
      contacts: totalContacts,
      complaints: totalComplaints,
      surveys: totalSurveys,
    });
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    return NextResponse.json(
      {
        articles: 0,
        pendingTasks: 0,
        pendingEvents: 0,
        contacts: 0,
        complaints: 0,
        surveys: 0,
        error: "Failed to fetch dashboard statistics",
      },
      { status: 500 }
    );
  }
}
