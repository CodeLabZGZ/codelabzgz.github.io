import { NextResponse } from "next/server"

export async function POST(request) {
  return NextResponse.json({ 
      data: {},
      status: {}
    }, {  status: 201  })
}
 
export async function GET(request) {
  return NextResponse.json({ 
    data: {},
    status: {}
  }, {  status: 201  })
}