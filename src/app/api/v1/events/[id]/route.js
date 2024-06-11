import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { events } from "@/schema"

export async function PUT(request, context) {
  const id = context.params.id
  const values = request.json()
  const data = await db.update(events)
    .set(values)
    .where(eq(events.id, id))
    .returning()

  return NextResponse.json({ 
    data,
    status: {
      code: 200,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, {  status: 200  })
}
 
export async function PATCH(request, context) {
  const id = context.params.id
  const {title, description} = request.json()

  const values = {
    ...(title && { title }),
    ...(description && { description }),
  }

  const data = await db.update(events)
    .set(values)
    .where(eq(events.id, id))
    .returning()

  return NextResponse.json({ 
    data,
    status: {
      code: 200,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, {  status: 200  })
}

export async function GET(request, context) {
  const id = context.params.id
  const data = await db.query.events.findFirst({ 
    where: eq(events.id, id)
  })

  return NextResponse.json({ 
    data,
    status: {
      code: 200,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, {  status: 200  })
}
 
export async function DELETE(request, context) {
  const id = context.params.id
  const data = await db.delete(events)
    .where(eq(events.id, id))
    .returning()

  return NextResponse.json({ 
    status: {
      code: 204,
      message: "",
      timestamp: new Date().toISOString()
    }
  }, {  status: 200  })
}

