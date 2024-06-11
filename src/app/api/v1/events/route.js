import { NextResponse } from "next/server"
import { db } from "@/db"
import { events } from "@/schema"

export async function POST(request) {
  const values = request.json()

  const data = await db.insert(events)
    .values(values)
    .returning()

  return NextResponse.json({ 
    data,
    status: {
      code: 201,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, { status: 201 })
}
 
export async function GET(request) {
  const data = await db.query.events.findMany()

  return NextResponse.json({ 
    data,
    status: {
      code: 200,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, { status: 200 })
}