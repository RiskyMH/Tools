import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //     next: { revalidate: 60 } // Revalidate every 60 seconds
    // });
    // const data = await res.json();
    console.log(request)

    return NextResponse.json({hello: 'world'})
}
