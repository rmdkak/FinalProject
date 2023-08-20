/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from 'api/supabase';
import { useAuthStore } from 'store';

import type { HTMLInputTypeAttribute, ReactNode } from 'react';
import type { RegisterOptions, SubmitHandler } from 'react-hook-form';

export interface SignupInputs {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
  phone: number;
}

type UseFormInput = (
  content: keyof SignupInputs,
  placeholder: string,
  type: HTMLInputTypeAttribute,
  validation?: RegisterOptions<SignupInputs, keyof SignupInputs>,
) => ReactNode;

export const Signup = () => {
  const navigate = useNavigate();
  const { currentSession } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({ mode: 'all' });

  // FIXME supabase rule confirm email 적용 할건지?
  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      await signup(data);
      navigate('/login');
    } catch (error) {
      console.error('error:', error);
      // TODO 커스텀alert 로직
    }
  };

  const useFormInput: UseFormInput = (content, placeholder, type, validation) => {
    return (
      <>
        <div className='flex self-start'>
          <label htmlFor={content} className='block mb-2 text-sm font-bold text-gray-700'>
            {content}
          </label>
          {validation?.required !== undefined && <span className='self-center ml-2 text-red-500'>*</span>}
        </div>
        <input
          {...register(content, validation)}
          type={type}
          placeholder={placeholder}
          className='px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300'
        />
        <p>{errors[content]?.message}</p>
      </>
    );
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
      <h2 className='text-3xl'>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2'>
        {useFormInput('email', '이메일', 'email', {
          required: '이메일을 입력해주세요.',
          minLength: { value: 8, message: '이메일이 너무 짧습니다.' },
        })}

        {useFormInput('nickname', '닉네임', 'text', {
          required: '닉네임을 입력해주세요.',
          minLength: { value: 2, message: '닉네임이 너무 짧습니다.' },
        })}

        {useFormInput('password', '비밀번호', 'password', {
          required: '비밀번호를 입력해주세요.',
          minLength: { value: 6, message: '비밀번호가 너무 짧습니다.' },
        })}

        {useFormInput('passwordCheck', '비밀번호', 'password', { required: true })}

        {useFormInput('phone', '휴대전화', 'tel')}

        <div className='flex gap-10'>
          <Link to={'/'}>
            <button
              type='button'
              className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'
            >
              이전
            </button>
          </Link>
          <button className='px-4 py-2 font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-blue-300'>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};
