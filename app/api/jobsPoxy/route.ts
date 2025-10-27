// pages/api/jobs/search.ts (for Pages Router)
// OR
// app/api/jobs/search/route.ts (for App Router)

import { NextRequest, NextResponse } from 'next/server';

// For Pages Router, use this interface:
interface NextApiRequest {
  method?: string;
  body: any;
}

interface NextApiResponse {
  status: (code: number) => NextApiResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
}

// Types
interface QueryOptions {
  keyword?: string;
  location?: string;
  dateSincePosted?: string;
  jobType?: string;
  remoteFilter?: string;
  salary?: string;
  experienceLevel?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  has_verification?: boolean;
  under_10_applicants?: boolean;
}

interface JobResult {
  position: string;         // Position title
  company: string;          // Company name
  companyLogo?: string;     // Company Logo (optional if not always present)
  location: string;         // Location of the job
  date: string;             // Date the job was posted
  agoTime?: string;         // Time since it was posted (optional if not always present)
  salary?: string;          // Salary range
  jobUrl: string;           // URL of the job page
}

// Validation function
function validateQueryOptions(options: any): QueryOptions {
  const validDateSincePosted = ['past month', 'past week', '24hr'];
  const validJobTypes = ['full time', 'part time', 'contract', 'temporary', 'volunteer', 'internship'];
  const validRemoteFilters = ['on site', 'remote', 'hybrid'];
  const validExperienceLevels = ['internship', 'entry level', 'associate', 'senior', 'director', 'executive'];
  const validSortBy = ['recent', 'relevant'];

  return {
    keyword: typeof options.keyword === 'string' ? options.keyword.trim() : '',
    location: typeof options.location === 'string' ? options.location.trim() : '',
    dateSincePosted: validDateSincePosted.includes(options.dateSincePosted) 
      ? options.dateSincePosted : 'past week',
    jobType: validJobTypes.includes(options.jobType) 
      ? options.jobType : 'full time',
    remoteFilter: validRemoteFilters.includes(options.remoteFilter) 
      ? options.remoteFilter : 'on site',
    salary: /^\d+$/.test(options.salary) ? options.salary : '40000',
    experienceLevel: validExperienceLevels.includes(options.experienceLevel) 
      ? options.experienceLevel : 'entry level',
    limit: /^\d+$/.test(options.limit) && parseInt(options.limit) <= 100 
      ? options.limit : '10',
    page: /^\d+$/.test(options.page) ? options.page : '0',
    sortBy: validSortBy.includes(options.sortBy) ? options.sortBy : 'recent',
    has_verification: Boolean(options.has_verification),
    under_10_applicants: Boolean(options.under_10_applicants),
  };
}

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') || 
               'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const queryOptions = validateQueryOptions(body);

    const linkedIn = require('linkedin-jobs-api');

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 30000)
    );

    const apiPromise = linkedIn.query(queryOptions);
    const response = await Promise.race([apiPromise, timeoutPromise]) as any[];

    // map to your new shape
    // Filter and sanitize response
const sanitizedJobs = response.map((job: any) => ({
  position: job.title || 'No title',
  company: job.company || 'Unknown company',
  companyLogo: job.companyLogo || null, // add company logo
  location: job.location || 'Not specified',
  date: job.date || 'Recently posted',
  agoTime: job.agoTime || '', // time since posted
  salary: job.salary || null,
  jobUrl: job.link || '#', // URL of the job page
}));


    const headers = new Headers();
    headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    headers.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({
      jobs: sanitizedJobs,
      total: sanitizedJobs.length,
      query: queryOptions,
    }), { headers });

  } catch (error: any) {
    console.error('LinkedIn API Error:', error);

    return NextResponse.json(
      { 
        error: 'Failed to fetch jobs',
        message: error.message || 'Unknown error occurred',
        jobs: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}


