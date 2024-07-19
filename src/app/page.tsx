import Link from 'next/link';
import { Toaster } from 'sonner';
import { FeedbackIcon } from '@/components/icons/feedback';
import { HelpIcon } from '@/components/icons/Help';
import Image from 'next/image';
import LoginForm from '@/components/login-form';
import ShortCutLinks from '@/components/quote';

async function LoginPage() {
  return (
    <>
      <main className='h-screen w-screen bg--50 flex flex-col md:flex-row '>
      <ShortCutLinks />

        <section className='w-full  flex justify-center items-center flex-col py-20'>
          <Image
            src={'/prisme .png'}
            width={150}
            height={150}
            alt='prisme logo'
            quality={100}
          />
          <h1 className='font-bold text-xl'>GESTION D&apos;ACHATS</h1>
          <h2 className=' text-3xl my-3'>Welcome Back</h2>
          <p className='mb-4 text-stone-600'>Please enter your details.</p>
          <LoginForm />
          <div className='text-sm py-5'>
            dont have an account?{' '}
            <Link href='/nouveau-compte' className='font-semibold'>
              Sign up
            </Link>
          </div>
        </section>
      </main>
      <Toaster position='top-center' richColors />
    </>
  );
}

export default LoginPage;
