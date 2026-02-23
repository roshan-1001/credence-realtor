import { NextRequest, NextResponse } from 'next/server';
import pathModule from 'path';
import fs from 'fs';

// Transform Alnair project to our Property-like format
function transformProject(project: any) {
  const stats = project.statistics?.total || {};
  const minPrice = stats.price_from || 0;
  const maxPrice = stats.price_to || 0;
  const photos = project.photos || [];
  const mainImage = project.cover?.src || project.logo?.src || photos[0]?.src || null;
  const gallery = photos.map((p: any) => p.src).filter((src: string) => src && src !== mainImage);

  let readyDate = project.construction_inspection_date;
  if (readyDate && typeof readyDate === 'string') {
    const match = readyDate.match(/(\d{4})-(\d{2})/);
    if (match) readyDate = `Q${Math.ceil(parseInt(match[2], 10) / 3)} ${match[1]}`;
  }

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    type: project.type === 'project' || project.type === 'compound' ? 'Off-Plan' : 'Off-Plan',
    price: minPrice || maxPrice,
    minPrice,
    maxPrice,
    mainImage,
    gallery,
    location: project.district?.title || '',
    locality: project.district?.title || '',
    city: 'Dubai',
    developer: project.builder || '',
    readyDate: readyDate || null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '9', 10)));
    const locality = searchParams.get('locality')?.trim().toLowerCase();
    const search = searchParams.get('search')?.trim().toLowerCase();
    const developer = searchParams.get('developer')?.trim().toLowerCase();
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!, 10) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!, 10) : undefined;

    const dataPath = pathModule.join(process.cwd(), 'src/data/all_data.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const json = JSON.parse(raw);
    let items = json?.data?.items || [];

    // Filter by locality
    if (locality) {
      items = items.filter(
        (p: any) =>
          p.district?.title?.toLowerCase().includes(locality) ||
          p.district?.title?.toLowerCase() === locality
      );
    }

    // Filter by search
    if (search) {
      items = items.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(search) ||
          p.builder?.toLowerCase().includes(search) ||
          p.district?.title?.toLowerCase().includes(search)
      );
    }

    // Filter by developer
    if (developer) {
      items = items.filter(
        (p: any) => p.builder?.toLowerCase().includes(developer)
      );
    }

    // Filter by price range
    if (minPrice !== undefined && minPrice > 0) {
      items = items.filter((p: any) => {
        const price = p.statistics?.total?.price_from || p.statistics?.total?.price_to || 0;
        return price >= minPrice;
      });
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      items = items.filter((p: any) => {
        const price = p.statistics?.total?.price_from || p.statistics?.total?.price_to || 0;
        return price <= maxPrice;
      });
    }

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const pageItems = items.slice(start, start + limit);
    const transformed = pageItems.map(transformProject);

    return NextResponse.json(
      {
        success: true,
        message: 'Projects fetched',
        data: transformed,
        pagination: { page, limit, total, totalPages },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in projects static API:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
        data: [],
        pagination: { page: 1, limit: 9, total: 0, totalPages: 0 },
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
