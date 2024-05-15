import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import {SettingsForm} from "@/app/(dashboard)/[collectionId]/(routes)/settings/components/settings-form";

interface SettingsPageProps {
    params: {
        collectionId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
                                                             params
                                                         }) => {

    const {userId} = auth();

    if (!userId) redirect('/sign-in');

    const collection = await prismadb.collection.findFirst({
        where: {
            id: params.collectionId,
            userId
        }
    });

    // to avoid manual collection ID input strings manipulation
    if (!collection) redirect('/');

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm intialData={collection} />
            </div>
        </div>
    )
}

export default SettingsPage;