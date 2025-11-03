import { NextResponse } from 'next/server';
import { generateAgentReply } from '@/lib/agent';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    const result = await generateAgentReply(String(message ?? ''), Array.isArray(history) ? history : []);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ reply: 'Sorry, something went wrong.' }, { status: 200 });
  }
}
