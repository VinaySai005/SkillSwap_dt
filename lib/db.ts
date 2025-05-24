// This is a mock database service for the SkillSwap application
// In a real application, this would connect to MongoDB or another database

import type { User, Skill, Session, Message, Review } from "./models/user"

// Mock collections
const users: User[] = []
const skills: Skill[] = []
const sessions: Session[] = []
const messages: Message[] = []
const reviews: Review[] = []

// User operations
export const createUser = async (
  userData: Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "skills" | "learningInterests" | "availability" | "reviews" | "rating"
  >,
) => {
  const newUser: User = {
    id: `user_${Date.now()}`,
    ...userData,
    skills: [],
    learningInterests: [],
    availability: [],
    reviews: [],
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  users.push(newUser)
  return newUser
}

export const getUserById = async (id: string) => {
  return users.find((user) => user.id === id)
}

export const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email)
}

export const updateUser = async (id: string, userData: Partial<User>) => {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    updatedAt: new Date(),
  }

  return users[userIndex]
}

// Skill operations
export const createSkill = async (skillData: Omit<Skill, "id" | "createdAt" | "updatedAt">) => {
  const newSkill: Skill = {
    id: `skill_${Date.now()}`,
    ...skillData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  skills.push(newSkill)

  // Add to user's skills
  const userIndex = users.findIndex((user) => user.id === skillData.userId)
  if (userIndex !== -1) {
    users[userIndex].skills.push(newSkill)
  }

  return newSkill
}

export const getSkillById = async (id: string) => {
  return skills.find((skill) => skill.id === id)
}

export const getSkillsByUserId = async (userId: string) => {
  return skills.filter((skill) => skill.userId === userId)
}

export const getAllSkills = async () => {
  return skills
}

export const updateSkill = async (id: string, skillData: Partial<Skill>) => {
  const skillIndex = skills.findIndex((skill) => skill.id === id)
  if (skillIndex === -1) return null

  skills[skillIndex] = {
    ...skills[skillIndex],
    ...skillData,
    updatedAt: new Date(),
  }

  return skills[skillIndex]
}

export const deleteSkill = async (id: string) => {
  const skillIndex = skills.findIndex((skill) => skill.id === id)
  if (skillIndex === -1) return false

  const skill = skills[skillIndex]

  // Remove from user's skills
  const userIndex = users.findIndex((user) => user.id === skill.userId)
  if (userIndex !== -1) {
    users[userIndex].skills = users[userIndex].skills.filter((s) => s.id !== id)
  }

  skills.splice(skillIndex, 1)
  return true
}

// Session operations
export const createSession = async (sessionData: Omit<Session, "id" | "createdAt" | "updatedAt">) => {
  const newSession: Session = {
    id: `session_${Date.now()}`,
    ...sessionData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  sessions.push(newSession)
  return newSession
}

export const getSessionById = async (id: string) => {
  return sessions.find((session) => session.id === id)
}

export const getSessionsByUserId = async (userId: string) => {
  return sessions.filter((session) => session.teacherId === userId || session.studentId === userId)
}

export const updateSession = async (id: string, sessionData: Partial<Session>) => {
  const sessionIndex = sessions.findIndex((session) => session.id === id)
  if (sessionIndex === -1) return null

  sessions[sessionIndex] = {
    ...sessions[sessionIndex],
    ...sessionData,
    updatedAt: new Date(),
  }

  return sessions[sessionIndex]
}

// Message operations
export const createMessage = async (messageData: Omit<Message, "id" | "createdAt">) => {
  const newMessage: Message = {
    id: `message_${Date.now()}`,
    ...messageData,
    createdAt: new Date(),
  }

  messages.push(newMessage)
  return newMessage
}

export const getMessagesBetweenUsers = async (user1Id: string, user2Id: string) => {
  return messages
    .filter(
      (message) =>
        (message.fromUserId === user1Id && message.toUserId === user2Id) ||
        (message.fromUserId === user2Id && message.toUserId === user1Id),
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}

export const markMessagesAsRead = async (fromUserId: string, toUserId: string) => {
  messages.forEach((message, index) => {
    if (message.fromUserId === fromUserId && message.toUserId === toUserId && !message.isRead) {
      messages[index] = {
        ...message,
        isRead: true,
      }
    }
  })

  return true
}

// Review operations
export const createReview = async (reviewData: Omit<Review, "id" | "createdAt">) => {
  const newReview: Review = {
    id: `review_${Date.now()}`,
    ...reviewData,
    createdAt: new Date(),
  }

  reviews.push(newReview)

  // Update user's reviews and rating
  const userIndex = users.findIndex((user) => user.id === reviewData.toUserId)
  if (userIndex !== -1) {
    users[userIndex].reviews.push(newReview)

    // Calculate new rating
    const userReviews = reviews.filter((review) => review.toUserId === reviewData.toUserId)
    const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0)
    users[userIndex].rating = totalRating / userReviews.length
  }

  return newReview
}

export const getReviewsByUserId = async (userId: string) => {
  return reviews.filter((review) => review.toUserId === userId)
}

// Matchmaking
export const findMatches = async (userId: string) => {
  const user = await getUserById(userId)
  if (!user) return []

  const matches: Array<{ user: User; matchScore: number }> = []

  // Get all users except the current user
  const otherUsers = users.filter((u) => u.id !== userId)

  for (const otherUser of otherUsers) {
    let matchScore = 0

    // Check if user's learning interests match other user's skills
    for (const interest of user.learningInterests) {
      if (otherUser.skills.some((skill) => skill.tags.some((tag) => interest.tags.includes(tag)))) {
        matchScore += 10
      }
    }

    // Check if user's skills match other user's learning interests
    for (const skill of user.skills) {
      if (otherUser.learningInterests.some((interest) => interest.tags.some((tag) => skill.tags.includes(tag)))) {
        matchScore += 10
      }
    }

    // Add location bonus for matching locations
    if (user.location && otherUser.location && user.location === otherUser.location) {
      matchScore += 5
    }

    // Add to matches if there's any match score
    if (matchScore > 0) {
      matches.push({
        user: otherUser,
        matchScore: Math.min(100, matchScore),
      })
    }
  }

  // Sort by match score (highest first)
  return matches.sort((a, b) => b.matchScore - a.matchScore)
}
