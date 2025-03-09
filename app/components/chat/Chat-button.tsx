"use client"

import { useState } from "react"
import Chat from "./Chat"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleChat = () => {
    if (isOpen) {
      if (isMinimized) {
        setIsMinimized(false)
      } else {
        setIsMinimized(true)
      }
    } else {
      setIsOpen(true)
      setIsMinimized(false)
    }
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition h-14 w-14 z-50 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          className={classNames(
            "fixed right-6 bottom-24 bg-white rounded-lg shadow-lg w-[380px] transition-all duration-300 z-40 border",
            isMinimized ? "h-14" : "h-[580px]",
          )}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-medium">Smart Search/Query</h3>
            <div className="flex gap-2">
              <button
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                onClick={toggleChat}
              >
                <span className="sr-only">{isMinimized ? "Expand chat" : "Minimize chat"}</span>
                <div className="h-1 w-5 bg-gray-700 rounded-full" />
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 transition"
                onClick={closeChat}
              >
                <span className="sr-only">Close chat</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="h-[calc(100%-48px)]">
              <Chat />
            </div>
          )}
        </div>
      )}
    </>
  )
}
