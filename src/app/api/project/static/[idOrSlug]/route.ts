import { NextRequest, NextResponse } from 'next/server';
// Import JSON at build time - ensures it works on Vercel (fs.readFileSync can fail in serverless)
import allDataJson from '@/data/all_data.json';

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
    statistics: project.statistics,
    district: project.district,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ idOrSlug: string }> }
) {
  try {
    const { idOrSlug } = await params;
    if (!idOrSlug?.trim()) {
      return NextResponse.json(
        { success: false, message: 'ID or slug required', data: null },
        { status: 400 }
      );
    }

    const items = (allDataJson as any)?.data?.items || [];

    const idOrSlugStr = idOrSlug.trim();
    const isNumeric = /^\d+$/.test(idOrSlugStr);
    const idNum = isNumeric ? parseInt(idOrSlugStr, 10) : null;

    const project = items.find((p: any) => {
      if (idNum !== null) return p.id === idNum;
      return (
        p.slug === idOrSlugStr ||
        p.slug?.toLowerCase() === idOrSlugStr.toLowerCase()
      );
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found', data: null },
        { status: 404 }
      );
    }

    const transformed = transformProject(project);

    return NextResponse.json(
      { success: true, message: 'Project found', data: transformed },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in project static API:', error);
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
