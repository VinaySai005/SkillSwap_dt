export interface User {
  id: string
  name: string
  email: string
  password: string // This would be hashed in a real application
  avatar?: string
  bio?: string
  location?: string
  skills: Skill[]
  learningInterests: Skill[]
  availability: Availability[]
  reviews: Review[]
  rating: number
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  userId: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Expert"
  isOnline: boolean
  location?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Availability {
  id: string
  userId: string
  day: string
  startTime: string
  endTime: string
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  skillId: string
  rating: number
  comment: string
  createdAt: Date
}

export interface Session {
  id: string
  teacherId: string
  studentId: string
  skillId: string
  date: Date
  startTime: string
  endTime: string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  text: string
  isRead: boolean
  createdAt: Date
}
