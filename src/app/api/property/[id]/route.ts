import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

// Alnair project detail endpoint (client-side only, requires cookie)
const ALNAIR_NEW_PROJECT_DETAIL_URL = 'https://alnair.ae/app/project/view';
// Cookie can be set via environment variable or use default
// Note: cf_clearance cookies expire and may need to be updated periodically
const ALNAIR_COOKIE = process.env.ALNAIR_CF_CLEARANCE_COOKIE || 'cf_clearance=FGkTUtSUmKWip3wtqIxUSKbdcLpZcSGxTr2Zg1.MhdQ-1769773671-1.2.1.1-5okLHH4RRZ15Kz4.75Haoip79DYtMLueLJ0y3OG83wp_WPnvgmeRy63loGJiG8f90x4oDTTC4mXuwz_hOWWLOmdox2cJ3nsKrRivljWnO.GHEG5KTomiBBb5zf5jY2bcNSgTTNUwJ8_KweUAzFob2An4VzcZc8Ic2QErpbEIn0NmA19FqIrLbHW5Kxu6sgm_OxHJ8WeXxQRfnaf7FWSHp_DHoSPm1z2KCb0Vz3VXKYQ';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Property ID is required',
          data: null
        },
        { status: 400 }
      );
    }

    // Build the Alnair API URL - exact format as specified
    const url = `${ALNAIR_NEW_PROJECT_DETAIL_URL}/${id}.data?_routes=pages%2Fproject%2Fproject_page`;
    
    // Verify cookie is set and properly formatted
    if (!ALNAIR_COOKIE || !ALNAIR_COOKIE.includes('cf_clearance=')) {
      console.error('⚠️ ALNAIR_CF_CLEARANCE_COOKIE is not set or invalid');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Cookie configuration error',
          data: null,
          error: 'cf_clearance cookie is required but not configured'
        },
        { status: 500 }
      );
    }

    // Extract and validate cookie value
    const cookieMatch = ALNAIR_COOKIE.match(/cf_clearance=([^;]+)/);
    if (!cookieMatch || !cookieMatch[1]) {
      console.error('⚠️ Invalid cf_clearance cookie format');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid cookie format',
          data: null,
          error: 'cf_clearance cookie format is invalid'
        },
        { status: 500 }
      );
    }

    const cookieValue = cookieMatch[1];

    if (process.env.NODE_ENV === 'development') {
      console.log('=== Fetching property from new Alnair API using Puppeteer ===');
      console.log('URL:', url);
      console.log('Property ID:', id);
      console.log('Cookie value length:', cookieValue.length);
    }

    // Use Puppeteer to make the request as a real browser
    // This bypasses Cloudflare's bot detection by executing JavaScript and behaving like a real browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    try {
      const page = await browser.newPage();
      
      // Set the cookie before navigating
      await page.setCookie({
        name: 'cf_clearance',
        value: cookieValue,
        domain: 'alnair.ae',
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'None',
      });

      // Set user agent and other browser characteristics
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
      
      // Set extra headers
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://alnair.ae/',
        'Origin': 'https://alnair.ae',
      });

      // Navigate to the URL and wait for network to be idle
      const response = await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      if (!response || !response.ok()) {
        const status = response?.status() || 0;
        const statusText = response?.statusText() || 'Unknown error';
        
        console.error(`=== Puppeteer Request Error ===`);
        console.error(`Status: ${status} ${statusText}`);
        
        const content = await page.content();
        if (content.includes('Just a moment') || content.includes('cf-challenge')) {
          console.error('⚠️ Cloudflare challenge detected in Puppeteer');
        }
        
        await browser.close();
        
        return NextResponse.json(
          { 
            success: false, 
            message: `API error: ${status} ${statusText}`,
            data: null,
            error: `Request failed with status ${status}`
          },
          { status: status || 500 }
        );
      }

      // Get the response content
      const contentType = response.headers()['content-type'] || '';
      if (!contentType.includes('application/json')) {
        const text = await page.content();
        console.error('Non-JSON response:', contentType);
        console.error('Response preview:', text.substring(0, 500));
        
        await browser.close();
        
        return NextResponse.json(
          { 
            success: false, 
            message: 'API returned non-JSON response',
            data: null,
            error: `Content-Type: ${contentType}`
          },
          { status: 500 }
        );
      }

      // Get JSON response - Puppeteer response needs to be read as text first
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Response text:', responseText.substring(0, 500));
        
        await browser.close();
        
        return NextResponse.json(
          { 
            success: false, 
            message: 'Invalid JSON response',
            data: null,
            error: 'Failed to parse response as JSON'
          },
          { status: 500 }
        );
      }
      
      await browser.close();

      if (process.env.NODE_ENV === 'development') {
        console.log('Puppeteer request successful, data received');
      }

      // Return the data
      return NextResponse.json({
        success: true,
        message: 'Property fetched successfully',
        data: data,
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    } catch (puppeteerError) {
      await browser.close();
      console.error('Puppeteer error:', puppeteerError);
      throw puppeteerError;
    }

  } catch (error) {
    console.error('Error in property API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch property',
        data: null,
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
