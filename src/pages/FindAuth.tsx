import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { findPassword } from "api/supabase";
import { INPUT_STYLE, Select, phoneOptions } from "components";

const TAB_STYLE = "w-[280px] pb-[12px] text-[18px] font-normal leading-[130%] text-center";
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
}
interface FindPasswordInput {
  emailForPassword: string;
  nicknameForPassword: string;
  phoneMidNumForPassword: string;
  phoneLastNumForPassword: string;
}

export const FindAuth = () => {
  const param = useParams();
  const navigate = useNavigate();
  const initialFocus =
    param.focus === "email" ? { focusEmail: true, focusPassword: false } : { focusEmail: false, focusPassword: true };
  const [focusTab, setFocusTab] = useState<FocusTab>(initialFocus);
  const [isDoneFind, setIsDoneFind] = useState(false);

  const [selectPhoneFistNum, setSelectPhoneFistNum] = useState<string | undefined>();

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
  } = useForm<FindEmailInput>();
  console.log("errors :", emailErrors);

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors },
  } = useForm<FindPasswordInput>();
  console.log("passwordErrors :", passwordErrors);

  const findEmailHandler: SubmitHandler<FindEmailInput> = (data) => {
    console.log("findEmailHandler :", data);
    // TODO
    // 휴대폰 번호 가공하기
    // data table에서 닉네임과 휴대폰 번호로 유저 찾기
    // 찾은 데이터의 {이메일, 가입일, 닉네임} 뽑아서 state에 저장하기
    // 성공 실패 여부 알려주기
    setIsDoneFind(true);
  };

  const findPasswordHandler: SubmitHandler<FindPasswordInput> = async (data) => {
    const { emailForPassword } = data;
    // TODO
    // 휴대폰 번호 가공하기

    // data table에서 이메일과 닉네임과 휴대폰 번호로 유저 찾기

    // 찾은 데이터의 유저에게 reset password 이메일 보내기
    await findPassword(emailForPassword);
    // dialog 변경
    alert("이메일이 전송되었습니다.");
    navigate("/");
  };

  useEffect(() => {
    return () => {
      // TODO
      // 찾은 데이터 state 초기화
    };
  }, []);

  return (
    <>
      <div className="w-[560px] flex flex-col items-center gap-[40px] mx-auto text-[12px] font-normal leading-[110%]">
        <h2 className="w-full text-center text-[32px] mt-[80px] pb-[24px] font-[400] leading-[130%]">회원정보 찾기</h2>
        <div className="flex items-center justify-center">
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
        {focusTab.focusEmail && !isDoneFind && (
          <form onSubmit={emailHandleSubmit(findEmailHandler)} className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="nicknameForEmail">닉네임</label>
              <input
                id="nicknameForEmail"
                {...emailRegister("nicknameForEmail")}
                placeholder="닉네임을 입력해주세요."
                className={INPUT_STYLE}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label>휴대 전화</label>
              <div className="flex items-center w-full">
                <Select
                  option={phoneOptions}
                  selectedValue={selectPhoneFistNum}
                  setSelectedValue={setSelectPhoneFistNum}
                  selfEnterOption={true}
                  placeholder="phone"
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...emailRegister("phoneMidNumForEmail", {
                    pattern: { value: /^[0-9]{3,4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
                  })}
                  type="text"
                  placeholder="휴대전화"
                  className={`${INPUT_STYLE} text-center`}
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...emailRegister("phoneLastNumForEmail", {
                    pattern: { value: /^[0-9]{4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
                  })}
                  type="text"
                  placeholder="휴대전화"
                  className={`${INPUT_STYLE} text-center`}
                />
              </div>
            </div>
            <button className="w-full text-center h-[48px] px-[24px] py-[12px] rounded-[8px] bg-point text-[14px] font-medium leading-[130%]">
              아이디 찾기
            </button>
          </form>
        )}
        {focusTab.focusEmail && isDoneFind && (
          <>
            <div className="flex flex-col w-full pb-[24px] border-b-[1px] border-b-black">
              <div className="flex h-[48px] items-center px-[24px] gap-[16px] text-[14px] font-normal leading-[110%]">
                <p className="text-gray03 min-w-[100px]">닉네임</p>
                <p className="w-full text-black">홍길동(로직 구현중)</p>
              </div>
              <div className="flex h-[48px] items-center px-[24px] gap-[16px] text-[14px] font-normal leading-[110%]">
                <p className="text-gray03 min-w-[100px]">가입된 이메일</p>
                <p className="text-black">abcd@naver.com</p>
                <p className="text-gray03 text-[12px] w-full">(2023.08.24 가입)</p>
              </div>
            </div>
            <Link
              to="/login"
              className="w-full text-center h-[48px] px-[24px] py-[12px] rounded-[8px] bg-point text-[14px] font-medium leading-[130%]"
            >
              로그인
            </Link>
            <div className="text-gray03 text-[12px] font-normal leading-[130%]">
              <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
              <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
            </div>
          </>
        )}
        {focusTab.focusPassword && !isDoneFind && (
          <form onSubmit={passwordHandleSubmit(findPasswordHandler)} className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <label>이메일</label>
              <input
                {...passwordRegister("emailForPassword")}
                placeholder="이메일을 입력해주세요."
                className={INPUT_STYLE}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label>닉네임</label>
              <input
                {...passwordRegister("nicknameForPassword")}
                placeholder="닉네임을 입력해주세요."
                className={INPUT_STYLE}
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label>휴대 전화</label>
              <div className="flex items-center w-full">
                <Select
                  option={phoneOptions}
                  selectedValue={selectPhoneFistNum}
                  setSelectedValue={setSelectPhoneFistNum}
                  selfEnterOption={true}
                  placeholder="phone"
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...passwordRegister("phoneMidNumForPassword", {
                    pattern: { value: /^[0-9]{3,4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
                  })}
                  type="text"
                  placeholder="휴대전화"
                  className={`${INPUT_STYLE} text-center`}
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...passwordRegister("phoneLastNumForPassword", {
                    pattern: { value: /^[0-9]{4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
                  })}
                  type="text"
                  placeholder="휴대전화"
                  className={`${INPUT_STYLE} text-center`}
                />
              </div>
            </div>
            <button className="w-full text-center h-[48px] px-[24px] py-[12px] rounded-[8px] bg-point text-[14px] font-medium leading-[130%]">
              비밀번호 찾기 || 메일로 새 비밀번호 받기
            </button>
          </form>
        )}
      </div>
    </>
  );
};
