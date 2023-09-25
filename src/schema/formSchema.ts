import * as yup from "yup";

const email = yup.string().required("이메일을 입력해주세요.");

const loginPassword = yup.string().required("비밀번호를 입력해주세요.");

const name = yup
  .string()
  .required("닉네임은 필수 입력 사항입니다.")
  .min(2, "닉네임이 너무 짧습니다.")
  .max(8, "닉네임이 너무 깁니다.");

const password = yup
  .string()
  .required("비밀번호를 입력해주세요.")
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?`~^&])[A-Za-z\d@$!%*#?`~^&]{8,}$/, {
    message: "영문 대문자, 영문 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.",
  })
  .min(6, "비밀번호가 너무 짧습니다.")
  .oneOf([yup.ref("passwordConfirm")], "비밀번호가 일치하지 않습니다.");

const passwordConfirm = yup.string().required();

const id = yup.string().required("이메일을 입력해주세요.").min(4, "id가 너무 짧습니다.").max(20, "id가 너무 깁니다.");

const idAnswer = yup.string().required("본인확인 질문에 답변해주세요.").min(2, "답변이 너무 짧습니다.");

export const loginSchema = yup.object({ email, password: loginPassword }).required();

export const signupSchema = yup.object({ id, idAnswer, name, password, passwordConfirm }).required();

export const updateUserNameSchema = yup.object({ name }).required();

export const updateUserPasswordSchema = yup.object({ password, passwordConfirm }).required();

export const findEmailSchema = yup.object({ nicknameForEmail: name, idAnswerForEmail: idAnswer }).required();

export const findPasswordSchema = yup
  .object({ emailForPassword: email, nicknameForPassword: name, idAnswerForPassword: idAnswer })
  .required();

const title = yup.string().required("이벤트 제목을 입력하세요.").max(100, "100자를 넘을 수 없습니다.");
const content = yup.string().required("이벤트 내용을 입력하세요.").max(1000, "1000자를 넘을 수 없습니다.");
const file = yup.array();
// const file = yup.mixed().required("이미지 파일을 넣어주세요.");
// .test("file", "이미지 파일을 넣어주세요.", (value) => {
//   if (value.length > 0) {
//     return true;
//   }
//   return false;
// });

const minDate = yup.string();
const maxDate = yup.string();

export const eventSchema = yup.object().shape({ title, content, minDate, maxDate, file }).required();
