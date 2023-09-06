import { AuthError } from "@supabase/supabase-js";
import { type LoginInputs } from "pages";
import { type Tables } from "types/supabase";

import { auth, supabase } from "./supabaseClient";

const TABLE = "USERS";
const STORAGE = "Images";
const PATH = "profileImg/";

interface SignupInputs {
  email: string;
  password: string;
  name: string;
  selectIdQuestion: string;
  idAnswer: string;
}

interface FindAuth {
  name: string;
  email: string;
  idQuestion: string;
  idAnswer: string;
}

/**
 * @Authentication signIn
 */
export const login = async (inputValue: LoginInputs) => {
  const { error } = await auth.signInWithPassword(inputValue);

  if (error !== null) throw new AuthError(error.message);
};

/**
 * @Authentication signOut
 */
export const logout = async () => {
  const { error } = await auth.signOut();

  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication signUp
 */
export const signup = async (inputValue: SignupInputs) => {
  const { email, password, name, idAnswer, selectIdQuestion } = inputValue;
  const { data, error } = await auth.signUp({
    email,
    password,
    options: { data: { name, avatar_url: "" } },
  });
  if (data.user != null) {
    await addUser({
      id: data.user.id,
      email,
      name,
      avatar_url: "",
      idAnswer,
      idQuestion: selectIdQuestion,
    });
  }
  if (error !== null) throw new Error(printErrorMessage(error.message));
};

export const findEmail = async ({ name, idQuestion, idAnswer }: Omit<FindAuth, "email">) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq("name", name)
    .eq("idQuestion", idQuestion)
    .eq("idAnswer", idAnswer)
    .single();
  console.error("error.message :", error?.message);
  if (error !== null) throw new Error(error.message);
  return data;
};

export const findPassword = async ({ name, email, idQuestion, idAnswer }: FindAuth) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq("name", name)
    .eq("email", email)
    .eq("idQuestion", idQuestion)
    .eq("idAnswer", idAnswer)
    .single();
  console.error("error.message :", error?.message);
  if (error !== null) throw new Error(error.message);
  return data;
};

export const sendEmailForFindPassword = async (email: string) => {
  const { error } = await auth.resetPasswordForEmail(email, {
    redirectTo: "https://www.stile.kr/update-password",
  });

  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changeEmail = async (email: string) => {
  const { error } = await auth.updateUser({ email });
  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changePassword = async (password: string) => {
  const { error } = await auth.updateUser({ password });
  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changeMetaAvatar = async (profileImgUrl: string) => {
  const { error } = await auth.updateUser({ data: { avatar_url: profileImgUrl } });
  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changeMetaName = async (name: string) => {
  const { error } = await auth.updateUser({ data: { name } });
  if (error !== null) throw new Error(error.message);
};

/**
 * @Authentication deleteUser
 */
export const deleteUser = async (userUid: string) => {
  await auth.admin.deleteUser(userUid);
};

/**
 * @table "USERS"
 * @method get
 */
export const fetchUser = async (userId: string) => {
  const { data, error } = await supabase.from(TABLE).select().eq("id", userId).single();
  if (error !== null) throw new Error(error.message);
  return data;
};

/**
 * @table "USERS"
 * @method get
 * @description 중복체크용 데이터
 */
export const fetchUserCheckData = async () => {
  const { data, error } = await supabase.from(TABLE).select("email,name");
  if (error !== null) throw new Error(error.message);
  return data;
};

/**
 * @table "USERS"
 * @method post
 */
export const addUser = async (inputValue: Tables<"USERS", "Insert">) => {
  const { error } = await supabase.from(TABLE).insert([inputValue]).select();

  if (error !== null) throw new Error(error.message);
};

/**
 * @table "USERS"
 * @method patch
 */
export const patchUser = async ({ inputValue, userId }: { inputValue: Tables<"USERS", "Update">; userId: string }) => {
  const { error } = await supabase.from(TABLE).update(inputValue).eq("id", userId).select();

  if (error !== null) throw new Error(error.message);
};

/**
 * @storagePath "Images/profileImg"
 * @method upload
 */
export const uploadImage = async ({ file, userId }: { file: Blob; userId: string }) => {
  const { error } = await supabase.storage
    .from(STORAGE)
    .upload(`${PATH}${userId}`, file, { cacheControl: "3600", upsert: true });
  if (error !== null) throw new Error(error.message);
};

/**
 * @storagePath "Images/profileImg"
 * @method remove
 */
export const deleteImage = async (imgId: string) => {
  const { error } = await supabase.storage.from(STORAGE).remove([`${PATH}${imgId}`]);
  if (error !== null) throw new Error(error.message);
};

const OAUTH_OPTIONS = { queryParams: { access_type: "offline", prompt: "consent" } };
/**
 * @Authentication signInWithOAuth
 * @provider google
 */
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "google", options: OAUTH_OPTIONS });

  if (error !== null) throw new Error("로그인 정보가 잘못되었습니다.");
};

/**
 * @Authentication signInWithOAuth
 * @provider github
 */
export const githubLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "github", options: OAUTH_OPTIONS });

  if (error !== null) throw new Error("로그인 정보가 잘못되었습니다.");
};

/**
 * @Authentication signInWithOAuth
 * @provider kakao
 */
export const kakaoLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "kakao", options: OAUTH_OPTIONS });

  if (error !== null) throw new Error("로그인 정보가 잘못되었습니다.");
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
