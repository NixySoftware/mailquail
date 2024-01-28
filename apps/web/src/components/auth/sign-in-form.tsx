'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {signIn} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@repo/ui/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@repo/ui/components/ui/form';
import {Input} from '@repo/ui/components/ui/input';

const formSchema = z.object({
    email: z.string().email()
});

export interface SignInFormProps {
    callbackUrl: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({callbackUrl}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await signIn('email', {
            email: data.email.toLowerCase(),
            callbackUrl
        });
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
