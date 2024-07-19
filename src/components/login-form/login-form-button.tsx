import { useFormStatus, useFormState } from 'react-dom';

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type='submit' className='p-2'>
      {pending ? 'Submitting...' : 'Login'}
    </button>
  );
}
