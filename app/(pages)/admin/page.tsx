"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Files, MessageSquare, Users, Edit, ClipboardList, Clock, Calendar, BarChart3, AlertCircle, PieChart, Plus, Trash2, X } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Task type definition
interface Task {
  id: string
  _id?: string
  title: string
  completed: boolean
  createdAt: string
}

// Event type definition
interface Event {
  id: string;
  _id?: string;
  title: string
  date: string
  time: string
  type: "editorial" | "content" | "maintenance" | "meeting" | "other"
  createdAt: string
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month" | "year">("week")

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)

  // Events state
  const [events, setEvents] = useState<Event[]>([])
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Omit<Event, "id" | "createdAt">>({
    title: "",
    date: "",
    time: "",
    type: "meeting"
  })
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)

  // Mock data for dashboard stats
  const stats = {
    articles: 124,
    pendingArticles: 18,
    publishedToday: 7,
    totalViews: 45892,
    activeUsers: 1243,
    complaints: 5,
    surveys: 3,
  }

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "article",
      title: "New Research Collaboration with IIT Kanpur",
      time: "2 hours ago",
      user: "Dr. Sharma",
    },
    { id: 2, type: "complaint", title: "Library Access Issue", time: "5 hours ago", user: "Student Council" },
    {
      id: 3,
      type: "article",
      title: "Annual Cultural Festival Dates Announced",
      time: "Yesterday",
      user: "Events Committee",
    },
    { id: 4, type: "survey", title: "Campus Facilities Feedback", time: "Yesterday", user: "Admin Team" },
    {
      id: 5,
      type: "article",
      title: "Faculty Development Program on AI Applications",
      time: "2 days ago",
      user: "Dr. Patel",
    },
  ]

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents()
  }, [])

  // Fetch tasks from API
  const fetchTasks = async () => {
    setIsLoadingTasks(true)
    try {
      const response = await fetch("/api/admin/tasks")
      if (!response.ok) throw new Error("Failed to fetch tasks")

      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast({
        title: "Error",
        description: "Failed to load tasks. Please try again.",
        variant: "destructive",
      })
      // Set some default tasks if API fails
      setTasks([
        { id: "1", title: "Review pending articles", completed: false, createdAt: new Date().toISOString() },
        { id: "2", title: "Respond to complaints", completed: false, createdAt: new Date().toISOString() },
        { id: "3", title: "Update homepage banner", completed: true, createdAt: new Date().toISOString() },
        { id: "4", title: "Prepare monthly report", completed: false, createdAt: new Date().toISOString() },
        { id: "5", title: "Schedule social media posts", completed: false, createdAt: new Date().toISOString() },
      ])
    } finally {
      setIsLoadingTasks(false)
    }
  }

  // Fetch events from API
  const fetchEvents = async () => {
    setIsLoadingEvents(true)
    try {
      const response = await fetch("/api/admin/events")
      if (!response.ok) throw new Error("Failed to fetch events")

      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      })
      // Set some default events if API fails
      setEvents([
        {
          id: "1",
          title: "Editorial Meeting",
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: "10:00",
          type: "editorial",
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          title: "Content Review",
          date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
          time: "14:00",
          type: "content",
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          title: "Website Maintenance",
          date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          time: "09:00",
          type: "maintenance",
          createdAt: new Date().toISOString()
        },
      ])
    } finally {
      setIsLoadingEvents(false)
    }
  }

  // Add a new task
  const addTask = async () => {
    if (!newTaskTitle.trim()) return

    const newTask: Omit<Task, "id" | "createdAt"> = {
      title: newTaskTitle,
      completed: false,
    }

    try {
      const response = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })

      if (!response.ok) throw new Error("Failed to add task")

      const addedTask = await response.json()
      setTasks([...tasks, addedTask])
      setNewTaskTitle("")
      setIsAddingTask(false)

      toast({
        title: "Success",
        description: "Task added successfully",
      })
    } catch (error) {
      console.error("Error adding task:", error)
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      })

      // Optimistically add the task even if API fails
      const tempTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setTasks([...tasks, tempTask])
      setNewTaskTitle("")
      setIsAddingTask(false)
    }
  }

  // Toggle task completion status
  const toggleTaskCompletion = async (taskId: string) => {
    const taskIndex = tasks.findIndex(task => task._id === taskId)
    if (taskIndex === -1) return

    const updatedTask = {
      ...tasks[taskIndex],
      completed: !tasks[taskIndex].completed,
    }

    const updatedTasks = [...tasks]
    updatedTasks[taskIndex] = updatedTask

    // Optimistically update UI
    setTasks(updatedTasks)

    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })

      if (!response.ok) throw new Error("Failed to update task")
    } catch (error) {
      console.error("Error updating task:", error)
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })

      // Revert changes if API call fails
      setTasks(tasks)
    }
  }

  // Delete a task
  const deleteTask = async (taskId: string) => {
    // Optimistically remove from UI
    const updatedTasks = tasks.filter(task => task._id !== taskId)
    setTasks(updatedTasks)

    try {
      const response = await fetch(`/api/admin/tasks/${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete task")

      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      })

      // Revert changes if API call fails
      fetchTasks()
    }
  }

  // Add a new event
  const addEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.time) {
      toast({
        title: "Error",
        description: "Please fill in all event details",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })

      if (!response.ok) throw new Error("Failed to add event")

      const addedEvent = await response.json()
      setEvents([...events, addedEvent])

      // Reset form and close dialog
      setNewEvent({
        title: "",
        date: "",
        time: "",
        type: "meeting"
      })
      setIsEventDialogOpen(false)

      toast({
        title: "Success",
        description: "Event added successfully",
      })
    } catch (error) {
      console.error("Error adding event:", error)
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      })

      // Optimistically add the event even if API fails
      const tempEvent: Event = {
        id: Date.now().toString(),
        ...newEvent,
        createdAt: new Date().toISOString(),
      }
      setEvents([...events, tempEvent])

      // Reset form and close dialog
      setNewEvent({
        title: "",
        date: "",
        time: "",
        type: "meeting"
      })
      setIsEventDialogOpen(false)
    }
  }

  // Delete an event
  const deleteEvent = async (eventId: string) => {
    // Optimistically remove from UI
    const updatedEvents = events.filter(event => event._id !== eventId)
    setEvents(updatedEvents)

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete event")

      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })

      // Revert changes if API call fails
      fetchEvents()
    }
  }

  // Format date for display
  const formatEventDate = (dateString: string, timeString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextMonday = new Date(today)
    nextMonday.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7)

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${timeString}`
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${timeString}`
    } else if (date.toDateString() === nextMonday.toDateString()) {
      return `Next Monday, ${timeString}`
    } else {
      return `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, ${timeString}`
    }
  }

  // Get event type color and icon
  const getEventTypeInfo = (type: Event['type']) => {
    switch (type) {
      case 'editorial':
        return { bgColor: 'bg-purple-100 dark:bg-purple-900/30', textColor: 'text-purple-600 dark:text-purple-400' }
      case 'content':
        return { bgColor: 'bg-green-100 dark:bg-green-900/30', textColor: 'text-green-600 dark:text-green-400' }
      case 'maintenance':
        return { bgColor: 'bg-blue-100 dark:bg-blue-900/30', textColor: 'text-blue-600 dark:text-blue-400' }
      case 'meeting':
        return { bgColor: 'bg-amber-100 dark:bg-amber-900/30', textColor: 'text-amber-600 dark:text-amber-400' }
      default:
        return { bgColor: 'bg-gray-100 dark:bg-gray-900/30', textColor: 'text-gray-600 dark:text-gray-400' }
    }
  }

  // Convert 24h time to 12h format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, manage your content and monitor site activity
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {(["day", "week", "month", "year"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedPeriod === period
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
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {stats.totalViews.toLocaleString()}
                </h3>
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
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                  {stats.activeUsers.toLocaleString()}
                </h3>
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
                      <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">View</button>
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Upcoming Events</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEventDialogOpen(true)}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </Button>
                </div>

                {isLoadingEvents ? (
                  <div className="flex justify-center py-8">
                    <div className="h-6 w-6 border-2 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No upcoming events</p>
                    <Button
                      variant="link"
                      onClick={() => setIsEventDialogOpen(true)}
                      className="mt-2"
                    >
                      Add your first event
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.slice(0, 3).map((event) => {
                      const typeInfo = getEventTypeInfo(event.type)

                      return (
                        <div key={event._id} className="group flex items-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg relative">
                          <div className={`${typeInfo.bgColor} p-2 rounded-lg mr-3`}>
                            <Calendar className={`h-5 w-5 ${typeInfo.textColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">{event.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatEventDate(event.date, formatTime(event.time))}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteEvent(event._id || '')}
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label="Delete event"
                          >
                            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      )
                    })}

                    {events.length > 3 && (
                      <Link
                        href="/admin/events"
                        className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                      >
                        View all {events.length} events
                      </Link>
                    )}
                  </div>
                )}
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
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {stats.articles - stats.pendingArticles}
                  </span>
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Tasks</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddingTask(true)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </Button>
              </div>

              {isLoadingTasks ? (
                <div className="flex justify-center py-8">
                  <div className="h-6 w-6 border-2 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {tasks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <ClipboardList className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>No tasks yet</p>
                        <Button
                          variant="link"
                          onClick={() => setIsAddingTask(true)}
                          className="mt-2"
                        >
                          Add your first task
                        </Button>
                      </div>
                    ) : (
                      tasks.map((task, idx) => (
                        <div key={task._id || idx} className="group flex items-center">
                          <Checkbox
                            id={`task-${task._id}`}
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task._id || '')}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`task-${task._id}`}
                            className={`ml-2 text-sm flex-1 ${task.completed
                              ? "text-gray-500 dark:text-gray-500 line-through"
                              : "text-gray-700 dark:text-gray-300"
                              }`}
                          >
                            {task.title}
                          </label>
                          <button
                            onClick={() => deleteTask(task._id || '')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Delete task"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {isAddingTask && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <Input
                          type="text"
                          placeholder="Add a new task..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="flex-1 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addTask()
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="ml-2"
                          onClick={addTask}
                        >
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setIsAddingTask(false)
                            setNewTaskTitle("")
                          }}
                          className="ml-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {!isAddingTask && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button

                        variant="link"
                        onClick={() => setIsAddingTask(true)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline p-0 h-auto"
                      >
                        + Add new task
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="event-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Title
              </label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="event-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="event-time" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <Input
                  id="event-time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="event-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Type
              </label>
              <select
                id="event-type"
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                <option value="meeting">Meeting</option>
                <option value="editorial">Editorial</option>
                <option value="content">Content</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
