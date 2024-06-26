"use client"

import * as z from "zod"

import {Modal} from "@/components/ui/modal";
import {useCollectionModal} from "@/hooks/use-collection-modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
})

export const CollectionModal = () => {
    const collectionModal = useCollectionModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/collections', values);

            // On successful POST through Modal, redirect to the dashboard
            window.location.assign(`/${response.data.id}`);
            // window location assign used as it enforces a full refresh, ensuring db update
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }

    }

    return (
        <Modal
            title="Create a collection type"
            description="Add a new Collection or Entity to manage it's attributes"
            isOpen={collectionModal.isOpen}
            onClose={collectionModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Display Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="Name of your collection"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={collectionModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                >
                                    Continue
                                </Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}