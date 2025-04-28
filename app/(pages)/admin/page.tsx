"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Files, MessageSquare, Users, Edit, ClipboardList, Clock, Calendar, BarChart3, AlertCircle, PieChart } from 'lucide-react'
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month" | "year">("week")

  // Mock data for dashboard stats
  const stats = {
    articles: 124,
    pendingArticles: 18,
    publishedToday: 7,
    totalViews: 45892,
    activeUsers: 1243,
    complaints: 5,
    surveys: 3
  }

  // Mock data for recent activity
  const recentActivity = [
    { id: 1, type: "article", title: "New Research Collaboration with IIT Kanpur", time: "2 hours ago", user: "Dr. Sharma" },
    { id: 2, type: "complaint", title: "Library Access Issue", time: "5 hours ago", user: "Student Council" },
    { id: 3, type: "article", title: "Annual Cultural Festival Dates Announced", time: "Yesterday", user: "Events Committee" },
    { id: 4, type: "survey", title: "Campus Facilities Feedback", time: "Yesterday", user: "Admin Team" },
    { id: 5, type: "article", title: "Faculty Development Program on AI Applications", time: "2 days ago", user: "Dr. Patel" }
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, manage your content and monitor site activity</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {(["day", "week", "month", "year"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === period 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Articles</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.articles}</h3>
                <p className="text-xs text-green-600 mt-1">+12% from last {selectedPeriod}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Files className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm border-l-4 border-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Articles</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.pendingArticles}</h3>
                <p className="text-xs text-amber-600 mt-1">Needs review</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.totalViews.toLocaleString()}</h3>
                <p className="text-xs text-green-600 mt-1">+8% from last {selectedPeriod}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.activeUsers.toLocaleString()}</h3>
                <p className="text-xs text-green-600 mt-1">+5% from last {selectedPeriod}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-start">
                      <div className="mr-4">
                        {activity.type === "article" && (
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                        {activity.type === "complaint" && (
                          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        {activity.type === "survey" && (
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                            <ClipboardList className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800 dark:text-white">{activity.title}</h3>
                        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{activity.user}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href="/admin/activity" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center"
                >
                  View all activity
                </Link>
              </div>
            </Card>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    href="/admin/editor" 
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                      <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Create New Article</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Draft a new post</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/admin/articles" 
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mr-3">
                      <Files className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Manage Articles</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Edit or delete existing articles</p>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/admin/complaints" 
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
                      <MessageSquare className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Review Complaints</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stats.complaints} pending complaints</p>
                    </div>
                  </Link>
                </div>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Editorial Meeting</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Content Review</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Friday, 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">Website Maintenance</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Next Monday, 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Content Overview */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Content Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Published</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{stats.articles - stats.pendingArticles}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${((stats.articles - stats.pendingArticles) / stats.articles) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{stats.pendingArticles}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${(stats.pendingArticles / stats.articles) * 100}%` }}
                  ></div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2">Category Distribution</h4>
                  <div className="flex justify-center">
                    <PieChart className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Academic (35%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Events (25%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Campus Life (20%)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Others (20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Tasks */}
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Review pending articles</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Respond to complaints</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 line-through">Update homepage banner</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Prepare monthly report</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Schedule social media posts</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  + Add new task
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
