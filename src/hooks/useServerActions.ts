import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface SupabaseActionResult<T> {
  data: T | null; // The data returned by the Supabase action
  error: AuthError | null; // The error returned by the Supabase action
}

interface InitiateActionProps<T> {
  action: () => Promise<SupabaseActionResult<T>>; // The Supabase action to execute
  successMessage?: string; // Custom success message for the toast
  errorMessage?: string; // Custom error message for the toast
  onSuccess?: (data: T | null) => void; // Optional callback for success
  onError?: (error: AuthError | PostgrestError | null) => void; // Optional callback for error
}

export const useServerActions = () => {
  const [isPending, startTransition] = useTransition();

  const initiateAction = <T>({
    action,
    successMessage = 'Action completed successfully!',
    errorMessage = 'An error occurred while performing the action.',
    onSuccess,
    onError,
  }: InitiateActionProps<T>) => {
    startTransition(async () => {
      try {
        const { data, error } = await action();
        if (error) {
          toast.error(error.message ?? errorMessage);
          onError?.(error);
          return;
        }

        toast.success(successMessage);
        onSuccess?.(data);
      } catch (error) {
        if (error && errorMessage) toast.error(errorMessage);
      }
    });
  };

  return { isPending, initiateAction };
};
