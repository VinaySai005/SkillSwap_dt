"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Globe, MapPin, MessageSquare, Star, User, Plus } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"

// Mock data for a single skill with Indian context
const mockSkill = {
  id: "skill1",
  title: "JavaScript Programming",
  description:
    "Learn JavaScript fundamentals, ES6+, and React basics. This course is designed for beginners who want to start their journey in web development. We'll cover variables, functions, objects, arrays, DOM manipulation, and modern JavaScript features. By the end, you'll be able to build simple interactive web applications.",
  level: "Intermediate",
  isOnline: true,
  location: "Remote",
  tags: ["Programming", "Web Development", "JavaScript", "React", "Frontend"],
  availability: [
    { day: "Monday", times: ["3:00 PM - 5:00 PM"] },
    { day: "Wednesday", times: ["4:00 PM - 6:00 PM"] },
    { day: "Saturday", times: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"] },
  ],
  requirements: [
    "Basic understanding of HTML and CSS",
    "A computer with internet access",
    "Text editor (VS Code recommended)",
    "Enthusiasm to learn!",
  ],
  whatYouWillLearn: [
    "JavaScript fundamentals and syntax",
    "Working with the DOM",
    "ES6+ features and modern JavaScript",
    "Introduction to React",
    "Building interactive web applications",
  ],
  user: {
    id: "user1",
    name: "Rahul Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Full-stack developer with 5 years of experience in Bangalore. Passionate about teaching and helping others learn to code.",
    rating: 4.8,
    reviews: 24,
    skills: ["JavaScript", "React", "Node.js", "Python"],
    interests: ["Photography", "Hindi Literature", "South Indian Cooking"],
  },
  reviews: [
    {
      id: "review1",
      user: {
        name: "Priya S.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "April 15, 2025",
      comment:
        "Rahul is an excellent teacher! He explained complex concepts in a way that was easy to understand. Highly recommend!",
    },
    {
      id: "review2",
      user: {
        name: "Arjun T.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "March 28, 2025",
      comment:
        "Great session on JavaScript fundamentals. Rahul was patient and knowledgeable. Looking forward to learning more!",
    },
  ],
}

export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("about")

  // In a real app, we would fetch the skill data based on the ID
  const skill = mockSkill

  const handleRequestSession = () => {
    toast({
      title: "Session Requested",
      description: `You've requested a session with ${skill.user.name} for ${skill.title}. They'll be notified shortly.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                  Back
                </Button>
                <Badge variant={skill.isOnline ? "default" : "secondary"}>
                  {skill.isOnline ? "Online" : "In-person"}
                </Badge>
                <Badge variant="outline">{skill.level}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{skill.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                {skill.isOnline ? <Globe className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                <span>{skill.location}</span>
              </div>
            </div>

            <Tabs defaultValue="about" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({skill.reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{skill.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {skill.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skill.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
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
                              className="text-primary"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {skill.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-muted p-1 mt-0.5">
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
                              className="text-muted-foreground"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Times</CardTitle>
                    <CardDescription>
                      These are the times when {skill.user.name} is available to teach this skill.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skill.availability.map((slot) => (
                        <div key={slot.day} className="border-b pb-4 last:border-0 last:pb-0">
                          <h3 className="font-medium mb-2">{slot.day}</h3>
                          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                            {slot.times.map((time) => (
                              <div key={time} className="flex items-center gap-2 p-2 rounded-md border">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleRequestSession}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Session
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>See what others have said about learning from {skill.user.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skill.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.user.name}</div>
                              <div className="text-xs text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Teacher</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={skill.user.avatar || "/placeholder.svg"} alt={skill.user.name} />
                    <AvatarFallback>{skill.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium">{skill.user.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{skill.user.rating}</span>
                    <span className="text-muted-foreground ml-1">({skill.user.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{skill.user.bio}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.user.skills.map((item) => (
                        <Badge key={item} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Learning Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.user.interests.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={handleRequestSession}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Session
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/messages/${skill.user.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/profile/${skill.user.id}`}>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exchange Skills</CardTitle>
                <CardDescription>What can you teach in return?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  SkillSwap is based on exchanging knowledge. Let {skill.user.name} know what skills you can offer in
                  return.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/skills/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add a Skill to Teach
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
