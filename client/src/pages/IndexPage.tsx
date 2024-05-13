import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { SignedIn, UserButton } from "@clerk/clerk-react";

const IndexPage = () => {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useUser();

    // Redirect to sign-in if not signed in
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate('/sign-in');
        }
    }, [isSignedIn, isLoaded, navigate]);

    return (
        <header>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}

export default IndexPage;
