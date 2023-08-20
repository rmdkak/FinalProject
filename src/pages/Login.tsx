import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'api/supabase';
import { useAuthStore } from 'store';

import type { SubmitHandler } from 'react-hook-form';

export interface LoginInputs {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const { currentSession, setStayLoggedInStatus } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('error :', error);
      // TODO 커스텀alert 로직
    }
  };

  useEffect(() => {
    if (currentSession !== null) {
      alert(`현재 로그인 상태입니다.
      잘못된 접근입니다.`);
      navigate('/');
    }
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-3xl'>로그인</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2'>
        <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-700 '>
          email
        </label>
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            minLength: { value: 8, message: '이메일이 너무 짧습니다.' },
          })}
          placeholder='email'
          className='px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300'
        />
        <p>{errors.email?.message}</p>
        <label htmlFor='password' className='block mb-2 text-sm font-bold text-gray-700'>
          password
        </label>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: { value: 6, message: '비밀번호가 너무 짧습니다.' },
          })}
          type='password'
          id='password'
          className='px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300'
          placeholder='password'
        />
        <p>{errors.password?.message}</p>
        <div className='flex items-center gap-10'>
          <div>
            <input type='checkbox' id='loginStatus' className='mr-2' onChange={setStayLoggedInStatus} />
            <label htmlFor='loginStatus' className='m-3'>
              로그인 상태 유지
            </label>
          </div>
          <button
            type='button'
            className='px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300'
          >
            비밀번호 찾기
          </button>
        </div>
        <div className='flex gap-10'>
          <button
            type='button'
            className='px-4 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300'
          >
            구글 로그인
          </button>
          <button
            type='button'
            className='px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300'
          >
            카카오로 로그인
          </button>
        </div>
        <button className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'>
          로그인
        </button>
        <Link to={'/signup'}>
          <button
            type='button'
            className='px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300'
          >
            회원가입
          </button>
        </Link>
      </form>
    </div>
  );
};
