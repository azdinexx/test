'use client';
import React from 'react';
import { login } from '@/actions/auth';
import { useFormState } from 'react-dom';
import { LoginButton } from './login-form-button'

function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action} className='px-6 py-6 flex flex-col gap-4 w-96'>
      {state?.error && <p className='text-red-500 text-xs'>{state.error}</p>}
      <div className='flex flex-col gap-2'>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          name='username'
          placeholder='username'
          className='p-2 rounded-md border border-gray-300'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='password'
          className='p-2 rounded-md border border-gray-300'
        />
      </div>

      <LoginButton />
    </form>
  );
}

export default LoginForm;
