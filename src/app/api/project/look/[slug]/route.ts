import { NextRequest, NextResponse } from 'next/server';

const ALNAIR_LOOK_API = 'https://api.alnair.ae/project/look';
const X_AUTH_TOKEN = process.env.ALNAIR_X_AUTH_TOKEN || 'cf1ed55abb0afdff68ebc730e743b016a1d9560f9ecc40606a5c3f890c290a1c';
const X_APP_VERSION = '14.2.2';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Slug is required', data: null },
        { status: 400 }
      );
    }

    const url = `${ALNAIR_LOOK_API}/${slug.trim()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-AUTH-TOKEN': X_AUTH_TOKEN,
        'X-App-Version': X_APP_VERSION,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      console.error(`Alnair look API error: ${status}`, text.substring(0, 200));
      return NextResponse.json(
        {
          success: false,
          message: `Failed to fetch project: ${status}`,
          data: null,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract important fields
    const result = {
      description: data.description || '',
      planned_at: data.planned_at || data.predicted_completion_at || null,
      construction_inspection_date: data.construction_inspection_date || null,
      statistics: data.statistics || null,
      cover: data.cover || null,
      galleries: data.galleries || [],
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Project fetched successfully',
        data: result,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Error in project look API route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch project',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
