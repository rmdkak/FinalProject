import { useNavigate } from 'react-router-dom';

import { logout } from 'api/supabase';
import { useAuthStore } from 'store';

export const Header = () => {
  const navigate = useNavigate();

  const { currentSession } = useAuthStore();
  const userUid = currentSession === null ? null : currentSession.user.id;

  // 로그아웃
  const logoutHandler = async () => {
    try {
      await logout();
      alert(`임시
      로그아웃 완료`);
    } catch (error) {
      console.error(error);
      // TODO 커스텀alert 로직
    }
  };

  // 마이페이지 이동
  const goToMypage = () => {
    if (userUid == null) return;
    navigate(`/mypage/${userUid}`);
  };

  return (
    <header>
      <button
        className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'
        onClick={() => {
          navigate('/');
        }}
      >
        Header
      </button>
      {currentSession === null ? (
        <>
          <button
            onClick={() => {
              navigate('/login');
            }}
            className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'
          >
            로그인
          </button>
        </>
      ) : (
        <>
          <button
            className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'
            onClick={logoutHandler}
          >
            임시_로그아웃_버튼
          </button>

          <button
            className='px-4 py-2 font-semibold text-white bg-teal-400 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300'
            onClick={goToMypage}
          >
            임시_마이페이지_버튼
          </button>
        </>
      )}
    </header>
  );
};
