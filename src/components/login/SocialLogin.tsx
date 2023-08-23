import { githubLogin, googleLogin, kakaoLogin } from "api/supabase";

export const SocialLogin = () => {
  return (
    <div className="mb-16 ">
      <div className=" relative mb-4 text-center before:content-[''] before:absolute before:block  before:top-1/2 before:left-0 before:w-full before:h-px before:bg-[#888] ">
        <h3 className="relative z-10 inline-block p-3 bg-[#fff] ;">SNS 계정으로 로그인하기</h3>
      </div>
      <div className="relative flex items-center justify-center">
        {/* <div className="flex mx-auto relative justify-between w-[127px]  after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-px after:h-2.5 after:block after:bg-[#888] after:translate-y-[-50%]"> */}
        <button onClick={githubLogin} type="button" className="block w-10 h-10 bg-gray-500">
          깃허브 로그인
        </button>
        <div className="mx-[23px]">|</div>
        <button onClick={googleLogin} type="button" className="block w-10 h-10 bg-red-500">
          구글 로그인
        </button>
        <div className="mx-[23px]">|</div>
        <button onClick={kakaoLogin} type="button" className="block w-10 h-10 bg-yellow-500">
          카카오로 로그인
        </button>
      </div>
    </div>
  );
};
