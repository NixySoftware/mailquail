'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import 'lucide-react';
import {Loader2} from 'lucide-react';
import {signIn} from 'next-auth/react';
import {useSearchParams} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@repo/ui/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@repo/ui/components/ui/form';
import {Input} from '@repo/ui/components/ui/input';

const formSchema = z.object({
    email: z.string().email()
});

export const SignInForm = () => {
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await signIn('email', {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams.get('from') ?? '/'
        });

        // if (!signInResult?.ok) {
        //     return toast({
        //         title: 'Something went wrong.',
        //         description: 'Your sign in request failed. Please try again.',
        //         variant: 'destructive'
        //     });
        // }

        // return toast({
        //     title: 'Check your email',
        //     description: 'We sent you a login link. Be sure to check your spam too.'
        // });
    });

    return (
        <Form {...form}>
            <form className="grid space-y-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    disabled={form.formState.isSubmitting}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="sr-only">Email address</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Email address"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in with email
                </Button>
            </form>
        </Form>
    );
};
