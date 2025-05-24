"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

// Helper function to get skill category color
const getSkillCategoryColor = (tags: string[]) => {
  const categoryColors: Record<string, string> = {
    Programming: "bg-blue-500 text-white",
    "Web Development": "bg-blue-600 text-white",
    JavaScript: "bg-yellow-500 text-black",
    React: "bg-cyan-500 text-white",
    Language: "bg-purple-500 text-white",
    Hindi: "bg-orange-500 text-white",
    Tamil: "bg-red-500 text-white",
    Bengali: "bg-green-500 text-white",
    Music: "bg-green-500 text-white",
    Tabla: "bg-green-600 text-white",
    Sitar: "bg-green-700 text-white",
    Cooking: "bg-orange-500 text-white",
    "Indian Cuisine": "bg-orange-600 text-white",
    "South Indian": "bg-red-600 text-white",
    Dance: "bg-pink-500 text-white",
    Bharatanatyam: "bg-pink-600 text-white",
    Kathak: "bg-purple-600 text-white",
    Yoga: "bg-indigo-500 text-white",
    Photography: "bg-indigo-600 text-white",
    Art: "bg-purple-700 text-white",
  }

  for (const tag of tags) {
    if (categoryColors[tag]) {
      return categoryColors[tag]
    }
  }
  return "bg-gray-500 text-white"
}

// Mock data for skills with Indian names and context
const mockSkills = [
  {
    id: "skill1",
    title: "JavaScript Programming",
    description: "Learn JavaScript fundamentals, ES6+, and React basics for web development",
    level: "Intermediate",
    isOnline: true,
    location: "Remote",
    tags: ["Programming", "Web Development", "JavaScript"],
    user: {
      id: "user1",
      name: "Rahul Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
  },
  {
    id: "skill2",
    title: "Hindi Conversation",
    description: "Practice conversational Hindi with a native speaker from Delhi",
    level: "Beginner",
    isOnline: true,
    location: "Remote",
    tags: ["Language", "Hindi", "Conversation"],
    user: {
      id: "user2",
      name: "Anita Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
  },
  {
    id: "skill3",
    title: "Tabla Lessons",
    description: "Learn tabla basics, classical rhythms, and popular Bollywood beats",
    level: "Beginner",
    isOnline: true,
    location: "Remote",
    tags: ["Music", "Tabla", "Classical"],
    user: {
      id: "user3",
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
  },
  {
    id: "skill4",
    title: "South Indian Cooking",
    description: "Learn to cook authentic South Indian dishes like dosa, sambar, and rasam",
    level: "Intermediate",
    isOnline: false,
    location: "Bangalore, Karnataka",
    tags: ["Cooking", "South Indian", "Traditional"],
    user: {
      id: "user4",
      name: "Lakshmi Iyer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
    },
  },
  {
    id: "skill5",
    title: "Bharatanatyam Dance",
    description: "Learn classical Bharatanatyam dance poses, expressions, and choreography",
    level: "Beginner",
    isOnline: false,
    location: "Chennai, Tamil Nadu",
    tags: ["Dance", "Bharatanatyam", "Classical"],
    user: {
      id: "user5",
      name: "Meera Krishnan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
  },
  {
    id: "skill6",
    title: "Digital Photography",
    description: "Learn composition, lighting, and editing techniques for stunning photos",
    level: "Intermediate",
    isOnline: true,
    location: "Remote",
    tags: ["Photography", "Art", "Digital"],
    user: {
      id: "user6",
      name: "Arjun Mehta",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
  },
  {
    id: "skill7",
    title: "Bengali Language",
    description: "Learn Bengali language basics, literature, and cultural context",
    level: "Beginner",
    isOnline: true,
    location: "Remote",
    tags: ["Language", "Bengali", "Literature"],
    user: {
      id: "user7",
      name: "Sanjay Chatterjee",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
  },
  {
    id: "skill8",
    title: "Yoga & Meditation",
    description: "Learn traditional yoga asanas, pranayama, and meditation techniques",
    level: "Beginner",
    isOnline: false,
    location: "Rishikesh, Uttarakhand",
    tags: ["Yoga", "Meditation", "Wellness"],
    user: {
      id: "user8",
      name: "Guru Ramesh",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
  },
]

export default function SkillsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Filter skills based on search query and filters
  const filteredSkills = mockSkills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLevel = levelFilter === "all" || skill.level.toLowerCase() === levelFilter.toLowerCase()

    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "online" && skill.isOnline) ||
      (locationFilter === "in-person" && !skill.isOnline)

    return matchesSearch && matchesLevel && matchesLocation
  })

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Browse Skills
            </h1>
            <p className="text-gray-600">Discover skills to learn from our community members across India</p>
          </div>
        </div>

        <div className="grid gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search skills, tags, or keywords..."
                  className="pl-8 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="in-person">In-Person Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Showing {filteredSkills.length} skills</p>
            <TabsList className="bg-gray-100">
              <TabsTrigger value="grid" className="data-[state=active]:bg-white">
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-white">
                List
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className="overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1 text-gray-900">{skill.title}</CardTitle>
                      <Badge
                        variant={skill.isOnline ? "default" : "secondary"}
                        className={skill.isOnline ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                      >
                        {skill.isOnline ? "Online" : "In-person"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-gray-600">{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                        {skill.level}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        {skill.isOnline ? (
                          <Globe className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5 mr-1 text-blue-500" />
                        )}
                        {skill.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skill.tags.map((tag) => (
                        <Badge key={tag} className={`text-xs ${getSkillCategoryColor([tag])}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-sm">
                        <span className="text-white font-medium text-sm">{skill.user.name.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{skill.user.name}</span>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-yellow-400 mr-1"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-xs text-gray-500">{skill.user.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                      asChild
                    >
                      <Link href={`/skills/${skill.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-3">
              {filteredSkills.map((skill) => (
                <Card key={skill.id} className="border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="flex flex-col md:flex-row p-4 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{skill.title}</h3>
                        <Badge
                          variant={skill.isOnline ? "default" : "secondary"}
                          className={`ml-2 ${skill.isOnline ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                          {skill.isOnline ? "Online" : "In-person"}
                        </Badge>
                        <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                          {skill.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skill.tags.map((tag) => (
                          <Badge key={tag} className={`text-xs ${getSkillCategoryColor([tag])}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        {skill.isOnline ? (
                          <Globe className="h-3.5 w-3.5 mr-1 text-green-500" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5 mr-1 text-blue-500" />
                        )}
                        {skill.location}
                      </div>
                    </div>
                    <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-sm">
                          <span className="text-white font-medium text-sm">{skill.user.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{skill.user.name}</span>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-yellow-400 mr-1"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-xs text-gray-500">{skill.user.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                        asChild
                      >
                        <Link href={`/skills/${skill.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
