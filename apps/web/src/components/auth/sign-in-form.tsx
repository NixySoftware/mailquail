'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import 'lucide-react';
import {Loader2} from 'lucide-react';
import {signIn} from 'next-auth/react';
import {useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {cn} from '@repo/ui';
import {buttonVariants} from '@repo/ui/components/ui/button';
import {Input} from '@repo/ui/components/ui/input';
import {Label} from '@repo/ui/components/ui/label';

// import {toast} from '@repo/ui/components/ui/use-toast';

const userAuthSchema = z.object({
    email: z.string().email()
});

type FormData = z.infer<typeof userAuthSchema>;

export const SignInForm = () => {
    // const {control, handleSubmit} = useForm<FormData>({
    //     defaultValues: {
    //         email: ''
    //     }
    // });

    // const onSubmit = handleSubmit(async (data) => {
    //     await signIn('email', {
    //         email: data.email
    //     });
    // });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema)
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();

    async function onSubmit(data: FormData) {
        setIsLoading(true);

        const signInResult = await signIn('email', {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams.get('from') || '/dashboard'
        });

        setIsLoading(false);

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
    }

    return (
        // <Form className="mt-6" onSubmit={onSubmit}>
        //     <Controller
        //         name="email"
        //         control={control}
        //         rules={{required: {value: true, message: 'This field is required.'}}}
        //         render={({field, fieldState}) => (
        //             <Input label="Email address" type="email" autoComplete="email" fieldState={fieldState} {...field} />
        //         )}
        //     />

        //     <Button
        //         className="w-full bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
        //         type="submit"
        //     >
        //         Sign in
        //     </Button>
        // </Form>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
                <div className="grid gap-1">
                    <Label className="sr-only" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading || isGitHubLoading}
                        {...register('email')}
                    />
                    {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>
                <button className={cn(buttonVariants())} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in with email
                </button>
            </div>
        </form>
    );
};
