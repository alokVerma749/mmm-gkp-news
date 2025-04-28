"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Files,
  MessageSquare,
  Users,
  Edit,
  ClipboardList,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Settings,
  BarChart3,
  Home,
} from "lucide-react"
import HeaderAdmin from "@/app/components/headerAdmin/HeaderAdmin"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState(true)

  // Sidebar navigation items
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Articles",
      path: "/admin/articles",
      icon: <Files className="h-5 w-5" />,
      children: [
        { name: "All Articles", path: "/admin/articles" },
        { name: "Department", path: "/admin/articles/department" },
        { name: "Hostel", path: "/admin/articles/hostel" },
        { name: "Library", path: "/admin/articles/library" },
        { name: "Events", path: "/admin/articles/events" },
        { name: "Placements", path: "/admin/articles/placements" },
        { name: "College Life", path: "/admin/articles/college_life" },
        { name: "Alumni", path: "/admin/articles/alumni" },
        { name: "Admissions", path: "/admin/articles/admissions" },
        { name: "Scholarships", path: "/admin/articles/scholarships" },
      ],
    },
    {
      name: "Editor",
      path: "/admin/editor",
      icon: <Edit className="h-5 w-5" />,
    },
    {
      name: "Complaints",
      path: "/admin/complaints",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Contacts",
      path: "/admin/contacts",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Surveys",
      path: "/admin/surveys",
      icon: <ClipboardList className="h-5 w-5" />,
    },
  ]

  const toggleCategories = () => {
    setOpenCategories(!openCategories)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderAdmin />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-64px)] sticky top-16">
          <div className="py-4">
            <div className="px-4 mb-4">
              <Link
                href="/"
                className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Website
              </Link>
            </div>

            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path))

                return (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={toggleCategories}
                          className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md ${isActive
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                          </div>
                          {openCategories ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {openCategories && (
                          <div className="mt-1 pl-4 space-y-1">
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.path

                              return (
                                <Link
                                  key={child.name}
                                  href={child.path}
                                  className={`flex items-center pl-3 pr-2 py-1.5 text-sm rounded-md ${isChildActive
                                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                    }`}
                                >
                                  <FolderOpen className="h-4 w-4 mr-2" />
                                  {child.name}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          }`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="mt-8 px-4">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin Tools
                </h3>
                <nav className="mt-2 space-y-1">
                  <Link
                    href="/admin/settings"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Link>
                  <Link
                    href="/admin/analytics"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <BarChart3 className="h-5 w-5 mr-3" />
                    Analytics
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
