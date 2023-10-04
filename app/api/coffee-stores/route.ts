import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';

const API_LIMIT = 6;

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ?? '',
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location') ?? '12.979169,77.640700';
    const page = Number(searchParams.get('page') ?? '1');
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTH ?? '',
      },
    };

    const [storesResponse, imagesResponse] = await Promise.all([
      fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=${location}&limit=${API_LIMIT}`, options),
      unsplash.search.getPhotos({
        query: 'coffee',
        page,
        perPage: API_LIMIT,
        orientation: 'portrait',
      }),
    ]);

    const json = await storesResponse.json();
    const images =
      imagesResponse?.response?.results?.map(result => ({
        regular: result?.urls?.regular ?? null,
        small: result?.urls?.small ?? null,
      })) ?? [];

    const results: Array<Partial<ICoffeeStore>> = json.results?.map((item: Partial<ICoffeeStore>, index: number) => ({
      ...item,
      images: images[index] ?? {},
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum consectetur libero id faucibus nisl tincidunt. Senectus et netus et malesuada fames ac turpis egestas. Nunc sed blandit libero volutpat sed. Velit euismod in pellentesque massa placerat duis.',
    }));

    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({}, { status: 500, statusText: 'Something went wrong' });
  }
}
