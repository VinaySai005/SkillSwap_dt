import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { createUser, getUserById, getUserByEmail, updateUser } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const email = searchParams.get("email")

    if (id) {
      const user = await getUserById(id)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Don't return the password
      const { password, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    }

    if (email) {
      const user = await getUserByEmail(email)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Don't return the password
      const { password, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    }

    return NextResponse.json({ error: "ID or email parameter is required" }, { status: 400 })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await hash(body.password, 10)

    const user = await createUser({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      avatar: body.avatar,
      bio: body.bio,
      location: body.location,
    })

    // Don't return the password
    const { password, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }
    
    const body = await request.json()
    
    // If updating password, hash it
    if (body.password) {
      body.password = await hash(body.password, 10)
    }
    
    const updatedUser = await updateUser(id, body)
    
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = updatedUser
    
    return NextResponse.json(userWithoutPassword)
  } catch (error\
