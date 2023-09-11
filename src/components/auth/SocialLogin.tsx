import { githubLogin, googleLogin, kakaoLogin } from "api/supabase";
import githubLogo from "assets/svgs/githubLogo.svg";
import googleLogo from "assets/svgs/googleLogo.svg";
import kakaoLogo from "assets/svgs/kakaoLogo.svg";

export const SocialLogin = () => {
  return (
    <div className="flex items-stretch justify-center w-full gap-3">
      <button
        onClick={kakaoLogin}
        type="button"
        className="flex w-full h-12 gap-2 px-6 py-3 border rounded-lg contents-center text-gray01"
      >
        <img src={kakaoLogo} alt="카카오 로그인" />
        <p>Kakao</p>
      </button>
      <button
        onClick={googleLogin}
        type="button"
        className="flex w-full h-12 gap-2 px-6 py-3 border rounded-lg contents-center text-gray01"
      >
        <img src={googleLogo} alt="구글 로그인" />
        Google
      </button>
      <button
        onClick={githubLogin}
        type="button"
        className="flex w-full h-12 gap-2 px-6 py-3 border rounded-lg contents-center text-gray01"
      >
        <img src={githubLogo} alt="깃허브 로그인" />
        Github
      </button>
    </div>
  );
};
