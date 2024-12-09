import { NextRequest, NextResponse } from 'next/server';
import cities from 'cities.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = Number(searchParams.get('limit') || '5');

  if (query.length < 2) {
    return NextResponse.json({ cities: [] });
  }

  const filteredCities = (cities as Array<{
    name: string;
    country: string;
    lat: string;
    lng: string;
  }>)
    .filter(city => 
      city.name.toLowerCase().startsWith(query)
    )
    .slice(0, limit);

  return NextResponse.json({ cities: filteredCities });
} 