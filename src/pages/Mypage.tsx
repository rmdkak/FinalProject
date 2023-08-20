import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteUser } from 'api/supabase';
import { useAuthStore } from 'store';

export const Mypage = () => {
  const navigate = useNavigate();
  const [currentTab, clickTab] = useState(0);

  const { currentSession } = useAuthStore();
  const currentUser = currentSession === null ? null : currentSession.user;

  if (currentUser === null) {
    navigate('/');
    alert('프로필은 로그인 후 이용가능합니다.');
  }

  // 회원 탈퇴
  const deleteUserHandler = async () => {
    try {
      if (currentUser === null) return;
      if (confirm('정말 삭제하시겠습니까?')) {
        await deleteUser(currentUser.id);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      // TODO 커스텀alert 로직
    }
  };

  const menuArray = [
    {
      name: '내가 쓴 글',
      component: (
        <>
          <p className="text-red-500">내가 쓴 글</p>
        </>
      )
    },
    {
      name: '내가 쓴 댓글',
      component: (
        <>
          <p className="text-red-500">내가 쓴 댓글</p>
        </>
      )
    },
    {
      name: '북마크',
      component: (
        <>
          <p className="text-red-500">북마크</p>
        </>
      )
    },
    {
      name: '내 정보',
      component: (
        <>
          <p className="text-red-500">내 정보</p>
          <form>
            <label htmlFor="email">내 이메일</label>
            <input
              id="email"
              disabled={true}
              defaultValue={currentUser?.email}
              className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="phone">휴대전화</label>
            <input
              id="phone"
              defaultValue={currentUser?.user_metadata.phone}
              className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              id="passwordConfirm"
              className="px-3 py-2 border rounded-lg w-50 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="px-4 py-2 font-semibold text-white bg-blue-400 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              수정하기
            </button>
          </form>
          <button
            className="px-4 py-2 font-semibold text-white bg-red-400 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={deleteUserHandler}
          >
            임시_회원탈퇴_버튼
          </button>
        </>
      )
    }
  ];

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const menuTab = menuArray.map((el, index) => (
    <li
      key={index}
      className={index === currentTab ? '포커스 된 css' : 'css'}
      onClick={() => {
        selectMenuHandler(index);
      }}
    >
      {el.name}
    </li>
  ));

  return (
    <>
      <h2 className="text-3xl">마이페이지</h2>
      <img alt="프로필 이미지" />
      <p>{currentUser?.user_metadata.nickname}</p>
      <p>
        {currentUser?.created_at !== undefined
          ? `${'계정 생성일 '.concat(currentUser?.created_at.slice(0, 10))}`
          : null}
      </p>
      <p>
        {currentUser?.last_sign_in_at !== undefined
          ? `${'마지막 로그인 '.concat(currentUser?.last_sign_in_at.slice(0, 10))}`
          : null}
      </p>
      <ul>{menuTab}</ul>
      <div>{menuArray[currentTab].component}</div>
    </>
  );
};
