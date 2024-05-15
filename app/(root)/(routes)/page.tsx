"use client"

import {UserButton} from "@clerk/nextjs";
import {useCollectionModal} from "@/hooks/use-collection-modal";
import {useEffect} from "react";

const SetupPage = () => {
    const onOpen = useCollectionModal(state => state.onOpen);
    const isOpen = useCollectionModal(state => state.isOpen);

    useEffect(() => {
        if (!isOpen) onOpen();

    }, [isOpen, onOpen])

    return null;
}

export default SetupPage;
