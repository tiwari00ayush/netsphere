'use server';

import { createClient } from '@/lib/supabase/server';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

interface UserCredentials {
  email: string;
  password: string;
  options?: {
    data?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

export const login = async ({ email, password }: UserCredentials) => {
  const supabase = await createClient();
  const cred: SignInWithPasswordCredentials = {
    email,
    password,
  };

  const { error, data } = await supabase.auth.signInWithPassword(cred);

  return { data, error };
};

export const signup = async ({ email, password, options }: UserCredentials) => {
  const supabase = await createClient();
  const cred: SignUpWithPasswordCredentials = {
    email,
    password,
    options,
  };
  const { data, error } = await supabase.auth.signUp(cred);

  return { data, error };
};
