import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  return new NextResponse('[GET] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export function POST(req: NextRequest) {
  return new NextResponse('[POST] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}