"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Collection} from "@prisma/client";
import {useCollectionModal} from "@/hooks/use-collection-modal";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Boxes, Check, ChevronsUpDown, PlusCircle} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface CollectionSwitcherProps extends PopoverTriggerProps {
    items: Collection[];

}

export default function CollectionSwitcher({
                                               className,
                                               items = []
                                           }: CollectionSwitcherProps) {
    const collectionModal = useCollectionModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    // acquiring the current collection ID
    const currCollection = formattedItems.find((item) => item.value === params.collectionId);
    const [open, setOpen] = useState(false);

    const onCollectionSelect = (collection: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/${collection.value}`);

    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a collection"
                    className={cn("w-[220px] justify-between", className)}
                >
                    <Boxes className="mr-2 h-4 w-4"/>
                    {currCollection?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search collection..."/>
                        <CommandEmpty>No collection found.</CommandEmpty>
                        <CommandGroup heading="Collections">
                            {formattedItems.map((collection) => (
                                <CommandItem
                                    key={collection.value}
                                    onSelect={() => onCollectionSelect(collection)}
                                    className="text-sm"
                                >
                                    <Boxes className="mr-2 h-4 w-4"/>
                                    {collection.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currCollection?.value === collection.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    collectionModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create Collection
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
};