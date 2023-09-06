import { githubLogin, googleLogin, kakaoLogin } from "api/supabase";
import githubLogo from "assets/svgs/githubLogo.svg";
import googleLogo from "assets/svgs/googleLogo.svg";
import kakaoLogo from "assets/svgs/kakaoLogo.svg";

export const SocialLogin = () => {
  return (
    <div className="w-full flex items-stretch justify-center gap-3">
      <button
        onClick={kakaoLogin}
        type="button"
        className="flex w-full contents-center gap-2 border rounded-lg text-gray01 h-12 px-6 py-3"
      >
        <img src={kakaoLogo} alt="카카오 로그인" />
        <p>Kakao</p>
      </button>
      <button
        onClick={googleLogin}
        type="button"
        className="flex w-full contents-center gap-2 border rounded-lg text-gray01 h-12 px-6 py-3"
      >
        <img src={googleLogo} alt="구글 로그인" />
        Google
      </button>
      <button
        onClick={githubLogin}
        type="button"
        className="flex w-full contents-center gap-2 border rounded-lg text-gray01 h-12 px-6 py-3"
      >
        <img src={githubLogo} alt="깃허브 로그인" />
        Github
      </button>
    </div>
  );
};
