import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      )
    }

    // Convert base64 data URL to buffer
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Upload to Vercel Blob
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `photo-${timestamp}.jpg`

    const blob = await put(filename, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    return NextResponse.json({
      success: true,
      url: blob.url
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    )
  }
}
