"use client"

import {useEffect, useState} from "react";
import {CollectionModal} from "@/components/modals/collection-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // precaution to avoid any Hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <CollectionModal />
        </>
    )
}