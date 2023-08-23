import { type LoginInputs } from "pages";
import { type Tables } from "types/supabase";

import { auth, supabase } from "./supabaseClient";

const TABLE = "USERS"
const STORAGE = "Images"
const PATH = "profileImg/"

const STORAGE_URL = process.env.REACT_APP_SUPABASE_STORAGE_URL as string;
const DEFAULT_PROFILE_IMG_URL = `${STORAGE_URL}/profileImg/defaultImg`;

interface SignupInputs {
  email: string;
  password: string;
  phone: string;
  name: string;
}

interface MetaData {
  phone: string | null;
  avatar_url: string | null;
  name: string | null;
}

// 로그인 기능
export const login = async (inputValue: LoginInputs) => {
  const { error } = await auth.signInWithPassword(inputValue);

  if (error != null) throw new Error(error.message);
};

const printErrorMessage = (message: string) => {
  switch (message) {
    case "Signup requires a valid password":
      return "비밀번호가 잘못되었습니다.";
    case "To signup, please provide your email":
      return "이메일이 잘못되었습니다.";
    case "Invalid API key":
      return "관리자 문의(code:API KEY)";
    default:
      return message;
  }
};

// 회원가입 기능
export const signup = async (inputValue: SignupInputs) => {
  const { email, password, name, phone } = inputValue;
  const { data: authData, error } = await auth.signUp({ email, password, options: { data: { name, phone, avatar_url: DEFAULT_PROFILE_IMG_URL } } });
  await postUser({ id: authData.user?.id, email, name, phone, avatar_url: DEFAULT_PROFILE_IMG_URL })

  if (error != null) throw new Error(printErrorMessage(error.message));
};

// 회원 정보 데이터 테이블 포스트
const postUser = async (inputValue: Tables<"USERS", "Insert">) => {
  const { error } = await supabase.from(TABLE).insert([inputValue]).select();

  if (error != null) throw new Error(error.message);
};

// 회원 정보 데이터 테이블 수정
// TODO 적용안됨
export const patchUser = async (inputValue: Tables<"USERS", "Update">, userId: string) => {
  const { error } = await supabase.from(TABLE).update(inputValue).eq("id", userId).select();

  if (error != null) throw new Error(error.message);
};

// 프로필 이미지 스토리지 저장
export const uploadImage = async (file: Blob, userId: string) => {
  // await supabase.storage.from(STORAGE).upload(`${PATH}${userId}`, file, { cacheControl: '3600', upsert: false })
  const { error } = await supabase.storage.from(STORAGE).upload(`${PATH}${userId}`, file, { cacheControl: '3600', upsert: true })
  if (error != null) throw new Error(error.message);
}

// 프로필 이미지 스토리지에서 삭제하기
// 회원 탈퇴 로직 사용
// TODO 되는지 확인
export const deleteImage = async (userId: string) => {
  const { error } = await supabase.storage.from(STORAGE).remove([`${PATH}${userId}`])
  if (error != null) throw new Error(error.message);
}

// 비밀번호 변경
export const changePassword = async (password: string) => {
  const { error } = await auth.updateUser({ password })
  if (error != null) throw new Error(error.message);
}

// 메타데이터 변경
export const changeMetaData = async ({ phone, avatar_url: profileImg, name }: MetaData) => {
  const { error } = await auth.updateUser({ data: { phone, avatar_url: profileImg, name } })
  if (error != null) throw new Error(error.message);
}

// 로그아웃 기능
export const logout = async () => {
  const { error } = await auth.signOut();

  if (error?.status != null) throw new Error("로그아웃에 실패하였습니다.");
};

// 회원탈퇴 기능
export const deleteUser = async (userUid: string) => {
  await deleteImage(userUid)
  await auth.admin.deleteUser(userUid);
};

// 소셜 로그인
const OAUTH_OPTIONS = { queryParams: { access_type: "offline", prompt: "consent" } }
// 구글 로그인
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "google", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
};

// 깃 로그인
export const githubLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "github", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
};

// 카카오 로그인
export const kakaoLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "kakao", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
};