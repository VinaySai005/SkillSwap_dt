"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"
import { Navbar } from "@/components/navbar"

// Mock data for conversations with Indian names
const mockConversations = [
  {
    id: "conv1",
    user: {
      id: "user1",
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      lastSeen: "Online",
    },
    lastMessage: {
      text: "I'm available for the tabla lesson tomorrow at 5 PM. Does that work for you?",
      timestamp: "10:30 AM",
      isRead: true,
      isFromMe: false,
    },
    unreadCount: 0,
  },
  {
    id: "conv2",
    user: {
      id: "user2",
      name: "Lakshmi Iyer",
      avatar: "/placeholder.svg?height=40&width=40",
      lastSeen: "2 hours ago",
    },
    lastMessage: {
      text: "Thanks for the JavaScript session yesterday! I learned a lot about React hooks.",
      timestamp: "Yesterday",
      isRead: false,
      isFromMe: false,
    },
    unreadCount: 1,
  },
  {
    id: "conv3",
    user: {
      id: "user3",
      name: "Meera Krishnan",
      avatar: "/placeholder.svg?height=40&width=40",
      lastSeen: "3 days ago",
    },
    lastMessage: {
      text: "I'd love to exchange Bharatanatyam lessons for your cooking skills!",
      timestamp: "3 days ago",
      isRead: true,
      isFromMe: true,
    },
    unreadCount: 0,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: "msg1",
    text: "Hi Vikram! I saw that you're teaching tabla lessons.",
    timestamp: "Yesterday, 4:30 PM",
    isFromMe: true,
  },
  {
    id: "msg2",
    text: "Yes, I am! Are you interested in learning tabla?",
    timestamp: "Yesterday, 4:45 PM",
    isFromMe: false,
  },
  {
    id: "msg3",
    text: "Definitely! I've always wanted to learn. I can teach you Hindi in exchange if you're interested.",
    timestamp: "Yesterday, 5:00 PM",
    isFromMe: true,
  },
  {
    id: "msg4",
    text: "That sounds perfect! I've been wanting to improve my Hindi for a while now.",
    timestamp: "Yesterday, 5:15 PM",
    isFromMe: false,
  },
  {
    id: "msg5",
    text: "Great! When are you available for lessons?",
    timestamp: "Yesterday, 5:20 PM",
    isFromMe: true,
  },
  {
    id: "msg6",
    text: "I'm available for the tabla lesson tomorrow at 5 PM. Does that work for you?",
    timestamp: "Today, 10:30 AM",
    isFromMe: false,
  },
]

export default function MessagesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeConversation, setActiveConversation] = useState<string | null>("conv1")
  const [message, setMessage] = useState("")
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: `msg${messages.length + 1}`,
      text: message,
      timestamp: "Just now",
      isFromMe: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Update the conversation list
    if (activeConversation) {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation) {
          return {
            ...conv,
            lastMessage: {
              text: message,
              timestamp: "Just now",
              isRead: true,
              isFromMe: true,
            },
          }
        }
        return conv
      })
      setConversations(updatedConversations)
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-8 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.user.avatar || "/placeholder.svg"}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.user.lastSeen === "Online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.isFromMe && "You: "}
                          {conversation.lastMessage.text}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={conversations.find((c) => c.id === activeConversation)?.user.avatar || "/placeholder.svg"}
                        alt={conversations.find((c) => c.id === activeConversation)?.user.name}
                      />
                      <AvatarFallback>
                        {conversations.find((c) => c.id === activeConversation)?.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {conversations.find((c) => c.id === activeConversation)?.user.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {conversations.find((c) => c.id === activeConversation)?.user.lastSeen}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isFromMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.isFromMe ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isFromMe ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Select a conversation</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
