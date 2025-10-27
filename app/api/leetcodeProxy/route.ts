// app/api/leetcode-proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {

    const body = await request.json(); 
    
    const response = await axios.post('https://leetcode.com/graphql', body, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}