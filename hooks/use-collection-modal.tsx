import {create} from "zustand"

interface useCollectionModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useCollectionModal = create<useCollectionModal>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))