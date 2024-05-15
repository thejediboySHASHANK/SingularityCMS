import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {collectionId: string};
}

const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {

    const collection = await prismadb.collection.findFirst({
        where: {
            id: params.collectionId,
        }
    });

    return (
        <div>
            Active Collection : {collection?.name}
        </div>
    )
}

export default DashboardPage;