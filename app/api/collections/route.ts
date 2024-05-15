import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {

        // fetching userId from Clerk authentication
        const {userId} = auth();
        const body = await req.json();

        const {name} = body;

        //checks if userId and name exist or not, if not then throw err
        if (!userId) return new NextResponse("Unauthorized", {status: 401});
        if (!name) return new NextResponse("Name is required", {status: 400});

        //creates on prisma
        const collection = await prismadb.collection.create({
            data: {
                name, userId
            }
        })

        //API response
        return NextResponse.json(collection);

    } catch (error) {
        console.log('[COLLECTION_POST]', error);
        return new NextResponse("Internal Error", {status: 500});
    }
}