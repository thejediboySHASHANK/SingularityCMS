import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import {useCollectionModal} from "@/hooks/use-collection-modal.tsx";

const IndexPage = () => {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useUser();

    const onOpen = useCollectionModal(state => state.onOpen);
    const isOpen = useCollectionModal(state => state.isOpen);

    // Redirect to sign-in if not signed in
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/sign-in');
        }
    }, [isSignedIn, isLoaded, navigate]);

    useEffect(() => {
        if (!isOpen) onOpen();

    }, [isOpen, onOpen])


    return (
        <header>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}

export default IndexPage;
