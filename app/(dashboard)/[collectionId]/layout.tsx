import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout ({
    children,
    params
                                              }: {
    children: React.ReactNode,
    params: {collectionId: string}
}) {
    const {userId} = auth();

    // if not logged in, then redirect to sign-in page
    if (!userId) {
        redirect('/sign-in');
    }

    // attempt to load the collection for the specific collection id
    const collection = await prismadb.collection.findFirst({
        where: {
            id: params.collectionId,
            userId
        }
    });

    // if the collection does not exist, then redirect to root page
    if (!collection) redirect('/');

    return (
        <>
            <div>
                This is a Navbar
            </div>
            {children}
        </>
    )
}