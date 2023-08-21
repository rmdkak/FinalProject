
import { auth } from "./supabaseClient";

import type { LoginInputs, SignupInputs } from "pages";

// 로그인 기능
export const login = async (inputValue: LoginInputs) => {
  const { error } = await auth.signInWithPassword(inputValue);

  if (error?.status != null) throw new Error(error.message);
};

const printErrorMessage = (message: string) => {
  switch (message) {
    case "Signup requires a valid password":
      return "비밀번호가 잘못되었습니다.";
    case "To signup, please provide your email":
      return "이메일이 잘못되었습니다.";
    case "Invalid API key":
      return "관리자 문의(API KEY)"
    default:
      return "회원가입이 실패하였습니다.";
  }
};

// 회원가입 기능
export const signup = async (inputValue: SignupInputs) => {
  const { email, password, nickname, phone } = inputValue;
  const { error } = await auth.signUp({
    email, password, options: { data: { nickname, phone, } }
  });

  if (error != null) {
    throw new Error(printErrorMessage(error.message));
  }
};

// 구글 로그인 및 회원가입 기능
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: { queryParams: { access_type: "offline", prompt: "consent" } }
  });

  if (error?.status != null) throw new Error("로그인 정보가 잘못되었습니다.");
};

// 로그아웃 기능
export const logout = async () => {
  const { error } = await auth.signOut();

  if (error?.status != null) throw new Error("로그아웃에 실패하였습니다.");
};

// 회원탈퇴 기능
export const deleteUser = async (userUid: string) => {
  console.log('userUid :', userUid);
  await auth.admin.deleteUser(userUid)

}
