import { NextResponse } from "next/server"
import { createSkill, getAllSkills, getSkillById, updateSkill, deleteSkill } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const skill = await getSkillById(id)
      if (!skill) {
        return NextResponse.json({ error: "Skill not found" }, { status: 404 })
      }
      return NextResponse.json(skill)
    }

    const skills = await getAllSkills()
    return NextResponse.json(skills)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.title || !body.description || !body.level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const skill = await createSkill({
      userId: body.userId,
      title: body.title,
      description: body.description,
      level: body.level,
      isOnline: body.isOnline || false,
      location: body.location,
      tags: body.tags || [],
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 })
    }

    const body = await request.json()
    const updatedSkill = await updateSkill(id, body)

    if (!updatedSkill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSkill)
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 })
    }

    const success = await deleteSkill(id)

    if (!success) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
