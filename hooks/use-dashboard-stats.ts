"use client"

import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export interface DashboardStats {
  articles: number
  pendingTasks: number
  pendingEvents: number
  contacts: number
  complaints: number
  surveys: number
  isLoading: boolean
  error: string | null
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    articles: 0,
    pendingTasks: 0,
    pendingEvents: 0,
    contacts: 0,
    complaints: 0,
    surveys: 0,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch("/api/admin/dashboard-stats", { credentials: "include" })
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard statistics")
        }

        const data = await response.json()
        setStats({
          ...data,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error)
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load dashboard statistics",
        }))
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchDashboardStats()
  }, [])

  return stats
}
