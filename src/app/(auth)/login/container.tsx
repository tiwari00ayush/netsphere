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
import { loginSchema } from '../schema';
import { login } from '@/actions/auth/login';
import { useServerActions } from '@/hooks/useServerActions';
import { useRouter } from 'next/navigation';

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPageContainer = () => {
  const router = useRouter();

  const { initiateAction, isPending } = useServerActions();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    initiateAction({
      action: () => login({ email: data.email, password: data.password }),
      successMessage: 'Login successful!',
      errorMessage: 'Login failed. Please try again.',
      onSuccess: (data) => {
        if (data?.user) {
          router.push('/home'); // Redirect to the home page on successful login
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 py-4">
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
            {isPending ? 'loading...' : 'Login'}
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Button variant="link" asChild className="p-0">
              <Link href="/signup">Sign up</Link>
            </Button>
          </p>
        </CardFooter>
      </form>
    </Form>
  );
};

export default LoginPageContainer;
