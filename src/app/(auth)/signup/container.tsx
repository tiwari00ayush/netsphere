'use client';

import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/Form';
import { useForm } from 'react-hook-form';
import { signup } from '@/actions/auth/login';
import { signupSchema } from '../schema';
import { useServerActions } from '@/hooks/useServerActions';
import { useRouter } from 'next/navigation';

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPageContainer = () => {
  const { initiateAction, isPending } = useServerActions();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    initiateAction({
      action: () =>
        signup({
          email: data.email,
          password: data.password,
          options: {
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
        }),
      successMessage:
        'Signup successful! Please check your email for verification.',
      errorMessage: 'Signup failed. Please try again.',
      onSuccess: () => {
        router.push('/home');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pt-4 pb-2">
          <div className="flex items-center gap-4">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Robinson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '...loading' : 'Create an account'}
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Button variant="link" asChild className="p-0">
              <Link href="/login">Sign in</Link>
            </Button>
          </p>
        </CardFooter>
      </form>
    </Form>
  );
};

export default SignupPageContainer;
