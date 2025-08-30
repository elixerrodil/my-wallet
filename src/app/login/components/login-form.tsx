'use client';

import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false, // prevent automatic redirect
      email,
      password
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard'); // redirect to dashboard on success
    }
  };

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
          <div className='mb-6 text-center'>
            <Image
              src='/globe.svg'
              alt='Logo here'
              width={100}
              height={100}
              className='mx-auto mb-4'
            />
            <h1 className='text-2xl font-bold text-gray-800'>Welcome Back</h1>
            <p className='text-gray-600'>Please sign in to your account</p>
          </div>
          <form
            className='space-y-6'
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={loading}
              />
            </div>

            {error && <p className='text-red-500'>{error}</p>}
            {loading && <p className='text-blue-500'>Loading...</p>}

            <button
              type='submit'
              disabled={loading}
              className='w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
