import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// To facilitate the DELETE and Name update feature in the settings page of a collection

export async function PATCH (
    req: Request,
    {params}: {params: {collectionId: string}}
){
    try {
        const {userId} = auth();
        const body = await req.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!params.collectionId) {
            return new NextResponse("Collection id is required", {status: 400});
        }

        const collection = await prismadb.collection.updateMany({
            where: {
                id: params.collectionId,
                userId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(collection);

    } catch (error) {
        console.log('[COLLECTION_PATCH]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}

export async function DELETE (
    req: Request,
    {params}: {params: {collectionId: string}}
){
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.collectionId) {
            return new NextResponse("Collection id is required", {status: 400});
        }

        const collection = await prismadb.collection.deleteMany({
            where: {
                id: params.collectionId,
                userId,
            },
        });

        return NextResponse.json(collection);

    } catch (error) {
        console.log('[COLLECTION_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}



