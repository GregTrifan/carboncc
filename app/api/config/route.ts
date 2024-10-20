import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tokens = JSON.parse(process.env.TOKENS || '[]');
    const creators = JSON.parse(process.env.CREATORS || '[]');

    return NextResponse.json({ tokens, creators });
  } catch (error) {
    console.error('Error parsing environment variables:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
