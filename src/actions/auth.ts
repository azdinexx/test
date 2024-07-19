'use server';
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from '@/lib/definitions';
import { db } from '@/lib/db';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { create } from 'domain';

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    username: formData.get('username'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { first_name, last_name, email, username, password } =
    validatedFields.data;


  // Call the provider or db to create a user...

  const user = await db.user.create({
    data: {
      firstName: first_name,
      lastName: last_name,
      username,
      email,
      password,
      role: 'USER',
    },
  });
  await createSession(user.id, user.role);
  // 5. Redirect user
  redirect('/agent');
}

export async function logout() {
  // 1. Delete session
  // 2. Redirect user
  await deleteSession();
  redirect('/');
}

export async function login(state: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password',
    };
  }

  const { username, password } = validatedFields.data;


  // Call the provider or db to create a user...
  const user = await db.user.findFirst({
    where: {
      username,
      password,
    },
  });

  if (!user) {
    return {
      error: 'Invalid email or password',
    };
  }

  await createSession(user.id, user.role);
  // 5. Redirect user
  // todo : distinguish between user and admin
  
  redirect('/agent');
}
