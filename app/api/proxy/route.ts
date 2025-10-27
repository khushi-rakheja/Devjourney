import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://codeforces.com/api/contest.list?',
      {
        method: 'GET',
       
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
