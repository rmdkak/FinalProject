import defaultImg from "assets/defaultImg.png";
import { type LoginInputs } from "pages";
import { type Tables } from "types/supabase";

import { auth, supabase } from "./supabaseClient";

const TABLE = "USERS";
const STORAGE = "Images";
const PATH = "profileImg/";

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

/**
 * @Authentication signIn
 */
export const login = async (inputValue: LoginInputs) => {
  const { error } = await auth.signInWithPassword(inputValue);

  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication signOut
 */
export const logout = async () => {
  const { error } = await auth.signOut();

  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication signUp
 */
export const signup = async (inputValue: SignupInputs) => {
  const { email, password, name, phone } = inputValue;
  const { data, error } = await auth.signUp({
    email,
    password,
    options: { data: { name, phone, avatar_url: DEFAULT_PROFILE_IMG_URL } },
  });
  if (data.user != null) {
    await addUser({ id: data.user.id, email, name, phone, avatar_url: DEFAULT_PROFILE_IMG_URL });
    await uploadImage({ file: defaultImg, userId: data.user.id });
  }
  if (error != null) throw new Error(printErrorMessage(error.message));
};

export const findPassword = async (email: string) => {
  const { error } = await auth.resetPasswordForEmail(email, {
    // FIXME 배포되면 변경되어야 함
    redirectTo: "http://localhost:3000/update-password",
  });

  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changeEmail = async (email: string) => {
  const { error } = await auth.updateUser({ email });
  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changePassword = async (password: string) => {
  const { error } = await auth.updateUser({ password });
  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication updateUser
 */
export const changeMetaData = async ({ phone, avatar_url: profileImg, name }: MetaData) => {
  const { error } = await auth.updateUser({ data: { phone, avatar_url: profileImg, name } });
  if (error != null) throw new Error(error.message);
};

/**
 * @Authentication deleteUser
 */
export const deleteUser = async (userUid: string) => {
  await deleteImage(userUid);
  await auth.admin.deleteUser(userUid);
};

/**
 * @table "USERS"
 * @method delete
 */
export const deleteUserData = async (userId: string) => {
  if (userId == null) return;
  await supabase.from(TABLE).delete().eq("userId", userId);
};

/**
 * @table "USERS"
 * @method get
 */
export const fetchUser = async (userUuid: string) => {
  const { data, error } = await supabase.from(TABLE).select().eq("id", userUuid);
  if (error != null) throw new Error(error.message);
  return data[0];
};

/**
 * @table "USERS"
 * @method get
 * @description 중복체크용 데이터
 */
export const fetchUserCheckData = async () => {
  const { data, error } = await supabase.from(TABLE).select("email,name");
  if (error != null) throw new Error(error.message);
  return data;
};

/**
 * @table "USERS"
 * @method post
 */
export const addUser = async (inputValue: Tables<"USERS", "Insert">) => {
  const { error } = await supabase.from(TABLE).insert([inputValue]).select();

  if (error != null) throw new Error(error.message);
};

/**
 * @table "USERS"
 * @method patch
 */
export const patchUser = async ({ inputValue, userId }: { inputValue: Tables<"USERS", "Update">; userId: string }) => {
  const { error } = await supabase.from(TABLE).update(inputValue).eq("id", userId).select();

  if (error != null) throw new Error(error.message);
};

/**
 * @storagePath "Images/profileImg"
 * @method upload
 */
const uploadImage = async ({ file, userId }: { file: Blob; userId: string }) => {
  // await supabase.storage.from(STORAGE).upload(`${PATH}${userId}`, file, { cacheControl: '3600', upsert: false })
  const { error } = await supabase.storage
    .from(STORAGE)
    .upload(`${PATH}${userId}`, file, { cacheControl: "3600", upsert: true });
  if (error != null) throw new Error(error.message);
};

/**
 * @storagePath "Images/profileImg"
 * @method update
 */
export const updateImage = async ({ file, userId }: { file: Blob; userId: string }) => {
  // await supabase.storage.from(STORAGE).upload(`${PATH}${userId}`, file, { cacheControl: '3600', upsert: false })
  const { error } = await supabase.storage
    .from(STORAGE)
    .update(`${PATH}${userId}`, file, { cacheControl: "3600", upsert: true });
  if (error != null) throw new Error(error.message);
};

/**
 * @storagePath "Images/profileImg"
 * @method remove
 */
export const deleteImage = async (userId: string) => {
  const { error } = await supabase.storage.from(STORAGE).remove([`${PATH}${userId}`]);
  if (error != null) throw new Error(error.message);
};

const OAUTH_OPTIONS = { queryParams: { access_type: "offline", prompt: "consent" } };
/**
 * @Authentication signInWithOAuth
 * @provider google
 */
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "google", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
};

/**
 * @Authentication signInWithOAuth
 * @provider github
 */
export const githubLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "github", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
};

/**
 * @Authentication signInWithOAuth
 * @provider kakao
 */
export const kakaoLogin = async () => {
  const { error } = await auth.signInWithOAuth({ provider: "kakao", options: OAUTH_OPTIONS });

  if (error != null) throw new Error("로그인 정보가 잘못되었습니다.");
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
