import { NextRequest, NextResponse } from 'next/server';

// Alnair API for developers
const ALNAIR_DEVELOPERS_URL = 'https://api.alnair.ae/developer/find';

// Cache duration: 10 minutes for developers list
const CACHE_DURATION = 600; // 10 minutes

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

function getCacheKey(page: string, limit: string, minProjects?: string): string {
  return `developers:${page}:${limit}:${minProjects || 'none'}`;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    const minProjects = searchParams.get('min_projects');

    // Check cache
    const cacheKey = getCacheKey(page, limit, minProjects || undefined);
    const cached = cache.get(cacheKey);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION * 1000) {
      return NextResponse.json(cached.data, {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          'X-Cache': 'HIT',
        },
      });
    }

    // Build the Alnair API URL
    const url = new URL(ALNAIR_DEVELOPERS_URL);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    // Log request for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('=== Developers API Request (Alnair) ===');
      console.log('URL:', url.toString());
    }

    // Fetch from Alnair API
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    // Log response for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('=== Developers API Response ===');
      console.log('Status:', response.status);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Alnair API error:', response.status, errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: `API error: ${response.status} ${response.statusText}`,
          data: [],
          error: errorText 
        },
        { 
          status: response.status,
          headers: {
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const alnairData = await response.json();
    
    // Transform Alnair response to match expected format
    const items = alnairData?.data?.items || [];
    const transformedData = items.map((dev: any) => ({
      id: dev.id,
      name: dev.title || dev.name || '',
      company: {
        name: dev.title || dev.name || '',
        logo: dev.logo?.src || '',
      },
      project_count: dev.statistics?.projects_count || dev.project_count || 0,
      logo: dev.logo?.src || '',
    }));
    
    // Filter by min_projects if specified
    let filteredData = transformedData;
    if (minProjects) {
      const minCount = parseInt(minProjects, 10);
      filteredData = transformedData.filter((dev: any) => dev.project_count >= minCount);
    }
    
    const responseData = {
      success: true,
      data: filteredData,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total: alnairData?.count || filteredData.length,
        total_pages: alnairData?.pages || Math.ceil(filteredData.length / parseInt(limit, 10)),
      },
    };
    
    // Store in cache
    cache.set(cacheKey, {
      data: responseData,
      timestamp: now,
    });

    // Clean up old cache entries (keep last 50 entries)
    if (cache.size > 50) {
      const entries = Array.from(cache.entries());
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      cache.clear();
      entries.slice(0, 50).forEach(([key, value]) => cache.set(key, value));
    }

    // Return response with caching headers
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error in developers API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch developers',
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
