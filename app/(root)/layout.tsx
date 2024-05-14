import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children
                                          }: {
    children: React.ReactNode
}) {
    const {userId} = auth();

    if (!userId) redirect('/sign-in');

    const collection = await prismadb.collection.findFirst({
        where: {
            userId: userId
        }
    });

    if (collection) {
        redirect(`/${collection.id}`);
    }

    return (
        <>
            {children}
        </>
    )
}