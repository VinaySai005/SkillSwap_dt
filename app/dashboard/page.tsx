"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MessageSquare, Plus, User, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

// Mock data for the dashboard with Indian names and context
const mockSkills = [
  {
    id: "skill1",
    title: "JavaScript Programming",
    description: "Teaching JavaScript fundamentals, ES6+, and React basics",
    level: "Intermediate",
    isOnline: true,
    tags: ["Programming", "Web Development", "JavaScript"],
  },
  {
    id: "skill2",
    title: "Hindi Conversation",
    description: "Conversational Hindi practice for beginners",
    level: "Beginner",
    isOnline: true,
    tags: ["Language", "Hindi", "Conversation"],
  },
]

const mockLearning = [
  {
    id: "learn1",
    title: "Tabla Lessons",
    description: "Want to learn tabla basics and classical rhythms",
    level: "Beginner",
    isOnline: true,
    tags: ["Music", "Tabla", "Classical"],
  },
  {
    id: "learn2",
    title: "South Indian Cooking",
    description: "Interested in learning authentic South Indian recipes",
    level: "Beginner",
    isOnline: false,
    tags: ["Cooking", "South Indian", "Traditional"],
  },
]

const mockMatches = [
  {
    id: "match1",
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    teachSkill: "Tabla Lessons",
    learnSkill: "Hindi Conversation",
    matchScore: 95,
  },
  {
    id: "match2",
    name: "Lakshmi Iyer",
    avatar: "/placeholder.svg?height=40&width=40",
    teachSkill: "South Indian Cooking",
    learnSkill: "JavaScript Programming",
    matchScore: 88,
  },
]

const mockSessions = [
  {
    id: "session1",
    title: "JavaScript Basics",
    with: "Lakshmi Iyer",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "Tomorrow",
    time: "3:00 PM - 4:00 PM",
    isTeaching: true,
  },
  {
    id: "session2",
    title: "Tabla Introduction",
    with: "Vikram Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "May 20, 2025",
    time: "5:00 PM - 6:00 PM",
    isTeaching: false,
  },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

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
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}! Manage your skills and connections.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/skills/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills Teaching</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSkills.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills Learning</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockLearning.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Potential Matches</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockMatches.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSessions.length}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled teaching and learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={session.avatar || "/placeholder.svg"} alt={session.with} />
                          <AvatarFallback>{session.with.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{session.title}</p>
                            <Badge variant={session.isTeaching ? "default" : "secondary"}>
                              {session.isTeaching ? "Teaching" : "Learning"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            With {session.with} • {session.date} • {session.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/schedule">
                      <Calendar className="mr-2 h-4 w-4" />
                      View All Sessions
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Potential Matches</CardTitle>
                  <CardDescription>People who match your teaching and learning interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMatches.map((match) => (
                      <div key={match.id} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                          <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{match.name}</p>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {match.matchScore}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Teaches: {match.teachSkill} • Learns: {match.learnSkill}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/matches">
                      <User className="mr-2 h-4 w-4" />
                      View All Matches
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teaching" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockSkills.map((skill) => (
                <Card key={skill.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{skill.title}</CardTitle>
                      <Badge variant={skill.isOnline ? "default" : "secondary"}>
                        {skill.isOnline ? "Online" : "In-person"}
                      </Badge>
                    </div>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/skills/${skill.id}/edit`}>Edit</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/skills/${skill.id}`}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="flex flex-col items-center justify-center p-6 h-full">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Add New Skill</h3>
                <p className="text-center text-muted-foreground mb-4">Share your knowledge and teach others</p>
                <Button asChild>
                  <Link href="/skills/new">Add Skill</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockLearning.map((skill) => (
                <Card key={skill.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{skill.title}</CardTitle>
                      <Badge variant={skill.isOnline ? "default" : "secondary"}>
                        {skill.isOnline ? "Online" : "In-person"}
                      </Badge>
                    </div>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{skill.level}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/skills/${skill.id}/edit`}>Edit</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/skills/${skill.id}`}>View</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="flex flex-col items-center justify-center p-6 h-full">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Add Learning Interest</h3>
                <p className="text-center text-muted-foreground mb-4">What skills would you like to learn?</p>
                <Button asChild>
                  <Link href="/skills/new?type=learning">Add Interest</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{match.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                          {match.matchScore}% Match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Teaches:</p>
                        <p className="text-sm text-muted-foreground">{match.teachSkill}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Wants to Learn:</p>
                        <p className="text-sm text-muted-foreground">{match.learnSkill}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/profile/${match.id}`}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/messages/${match.id}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{session.title}</CardTitle>
                      <Badge variant={session.isTeaching ? "default" : "secondary"}>
                        {session.isTeaching ? "Teaching" : "Learning"}
                      </Badge>
                    </div>
                    <CardDescription>With {session.with}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={session.avatar || "/placeholder.svg"} alt={session.with} />
                        <AvatarFallback>{session.with.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{session.date}</p>
                        <p className="text-sm text-muted-foreground">{session.time}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/messages/${session.with.toLowerCase().replace(" ", "-")}`}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/sessions/${session.id}`}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="flex flex-col items-center justify-center p-6 h-full">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Schedule Session</h3>
                <p className="text-center text-muted-foreground mb-4">Set up a new teaching or learning session</p>
                <Button asChild>
                  <Link href="/schedule/new">Schedule</Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
