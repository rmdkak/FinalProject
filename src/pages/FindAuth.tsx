import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { findEmail, findPassword, sendEmailForFindPassword } from "api/supabase";
import { DateConvertor, InvalidText, Select, idAnswerValid, idQuestionOptions, useDialog } from "components";
import { type Tables } from "types/supabase";

const TAB_STYLE = "w-[280px] pb-[12px] text-[18px] font-normal leading-[130%] text-center cursor-pointer";
const TAB_FOCUSED_STYLE = `${TAB_STYLE} text-black border-b-[1px] border-black`;
const TAB_UNFOCUSED_STYLE = `${TAB_STYLE} text-gray03`;

interface FocusTab {
  focusEmail: boolean;
  focusPassword: boolean;
}

interface FindEmailInput {
  nicknameForEmail: string;
  phoneMidNumForEmail: string;
  phoneLastNumForEmail: string;
  idAnswerForEmail: string;
}
interface FindPasswordInput {
  emailForPassword: string;
  nicknameForPassword: string;
  phoneMidNumForPassword: string;
  phoneLastNumForPassword: string;
  idAnswerForPassword: string;
}

export const FindAuth = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { Alert } = useDialog();
  const initialFocus =
    param.focus === "email" ? { focusEmail: true, focusPassword: false } : { focusEmail: false, focusPassword: true };
  const [focusTab, setFocusTab] = useState<FocusTab>(initialFocus);
  const [isDoneFind, setIsDoneFind] = useState(false);
  const [findUser, setFindUser] = useState<Tables<"USERS", "Row">>();
  const [selectIdQuestion, setSelectIdQuestion] = useState<string | undefined>();

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    reset: emailReset,
    setError: emailSetError,
    formState: { errors: emailErrors },
  } = useForm<FindEmailInput>();

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
    setError: passwordSetError,
    formState: { errors: passwordErrors },
  } = useForm<FindPasswordInput>();

  // 이메일 찾기
  const findEmailHandler: SubmitHandler<FindEmailInput> = async (data) => {
    const { nicknameForEmail: name, idAnswerForEmail: idAnswer } = data;

    if (selectIdQuestion === undefined) {
      emailSetError("idAnswerForEmail", { message: "본인확인 질문을 선택해주세요" });
      return;
    }

    await findEmail({ name, idAnswer, idQuestion: selectIdQuestion })
      .then((data) => {
        setIsDoneFind(true);
        setFindUser(data);
      })
      .catch(() => {
        emailSetError("root", { message: "해당 유저를 찾을 수 없습니다." });
        setIsDoneFind(false);
      });
  };

  // 비밀번호 찾기
  const findPasswordHandler: SubmitHandler<FindPasswordInput> = async (data) => {
    const { emailForPassword: email, nicknameForPassword: name, idAnswerForPassword: idAnswer } = data;

    if (selectIdQuestion === undefined) {
      passwordSetError("idAnswerForPassword", { message: "본인확인 질문을 선택해주세요" });
      return;
    }

    await findPassword({ name, email, idAnswer, idQuestion: selectIdQuestion })
      .then(async (data) => {
        await sendEmailForFindPassword(data.email);
        await Alert("이메일이 전송되었습니다.");
        navigate("/");
      })
      .catch(() => {
        passwordSetError("root", { message: "해당 유저를 찾을 수 없습니다." });
      });
  };

  useEffect(() => {
    return () => {
      // 찾은 데이터 초기화
      setFindUser(undefined);
    };
  }, []);

  return (
    <>
      <div className="w-[560px] flex-column items-center gap-10 mx-auto text-xs font-normal leading-[110%]">
        <h2 className="w-full text-center text-[32px] mt-[80px] pb-[24px] font-normal leading-[130%]">회원정보 찾기</h2>
        <div className="flex contents-center">
          <div
            className={focusTab.focusEmail ? TAB_FOCUSED_STYLE : TAB_UNFOCUSED_STYLE}
            onClick={() => {
              setFocusTab({ focusEmail: true, focusPassword: false });
              setIsDoneFind(false);
              passwordReset();
            }}
          >
            아이디 찾기
          </div>
          <div
            className={focusTab.focusPassword ? TAB_FOCUSED_STYLE : TAB_UNFOCUSED_STYLE}
            onClick={() => {
              setFocusTab({ focusEmail: false, focusPassword: true });
              setIsDoneFind(false);
              emailReset();
            }}
          >
            비밀번호 찾기
          </div>
        </div>

        {/* 아이디 찾기 */}
        {focusTab.focusEmail && !isDoneFind && (
          <form onSubmit={emailHandleSubmit(findEmailHandler)} className="w-full gap-4 flex-column contents-center">
            <div className="w-full flex-column gap-[8px]">
              <label htmlFor="nicknameForEmail">닉네임</label>
              <input
                id="nicknameForEmail"
                {...emailRegister("nicknameForEmail", { required: "닉네임을 입력해주세요" })}
                placeholder="닉네임을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={emailErrors.nicknameForEmail?.message} size={20} />

            <div className="w-full flex-column gap-[8px]">
              <label>본인확인질문</label>
              <Select
                placeholder={"본인확인 질문을 선택해주세요."}
                option={idQuestionOptions}
                selectedValue={selectIdQuestion}
                setSelectedValue={setSelectIdQuestion}
                selfEnterOption={false}
              />
              <input
                {...emailRegister("idAnswerForEmail", { ...idAnswerValid })}
                placeholder="본인확인 질문에 답변해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={emailErrors.idAnswerForEmail?.message} size={20} />

            <button className="text-center auth-button body-3 point-button">아이디 찾기</button>
            <InvalidText errorsMessage={emailErrors.root?.message} size={20} />
            <div className="text-gray03 text-[12px] font-normal leading-[130%]">
              <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
              <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
            </div>
          </form>
        )}

        {/* 아이디 찾기 완료 후 정보 표시 */}
        {focusTab.focusEmail && isDoneFind && (
          <>
            <div className="flex-column w-full pb-[24px] border-b-[1px] border-b-black">
              <div className="flex h-[48px] items-center px-[24px] gap-[16px] text-[14px] font-normal leading-[110%]">
                <p className="text-gray03 min-w-[100px]">닉네임</p>
                <p className="w-full text-black">{findUser?.name}</p>
              </div>
              <div className="flex h-[48px] items-center px-[24px] gap-[16px] text-[14px] font-normal leading-[110%]">
                <p className="text-gray03 min-w-[100px]">가입된 이메일</p>
                <p className="text-black">{findUser?.email}</p>
                <div className="text-gray03 text-[12px] w-full flex gap-1">
                  <span>(</span>
                  <DateConvertor datetime={findUser?.created_at as string} type="dotDate" />
                  <span>가입 )</span>
                </div>
              </div>
            </div>
            <Link to="/login" className="text-center auth-button body-3 point-button">
              로그인
            </Link>
          </>
        )}

        {/* 비밀번호 찾기 */}
        {focusTab.focusPassword && !isDoneFind && (
          <form
            onSubmit={passwordHandleSubmit(findPasswordHandler)}
            className="w-full gap-4 flex-column contents-center"
          >
            <div className="w-full flex-column gap-[8px]">
              <label>이메일</label>
              <input
                {...passwordRegister("emailForPassword", { required: "이메일을 입력해주세요." })}
                placeholder="이메일을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={passwordErrors.emailForPassword?.message} size={20} />

            <div className="w-full flex-column gap-[8px]">
              <label>닉네임</label>
              <input
                {...passwordRegister("nicknameForPassword")}
                placeholder="닉네임을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={passwordErrors.nicknameForPassword?.message} size={20} />

            <div className="w-full flex-column gap-[8px]">
              <label>본인확인질문</label>
              <Select
                placeholder={"본인확인 질문을 선택해주세요."}
                option={idQuestionOptions}
                selectedValue={selectIdQuestion}
                setSelectedValue={setSelectIdQuestion}
                selfEnterOption={false}
              />
              <input
                {...passwordRegister("idAnswerForPassword", { ...idAnswerValid })}
                placeholder="본인확인 질문에 답변해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={passwordErrors.idAnswerForPassword?.message} size={20} />

            <button className="text-center auth-button body-3 point-button">메일로 새 비밀번호 받기</button>
            <InvalidText errorsMessage={passwordErrors.root?.message} size={20} />
            <div className="text-gray03 text-[12px] font-normal leading-[130%]">
              <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
              <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
