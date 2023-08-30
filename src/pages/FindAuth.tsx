import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { findEmail, findPassword, sendEmailForFindPassword } from "api/supabase";
import { InvalidText, Select, phoneOptions } from "components";
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
  const [findUser, setFindUser] = useState<Tables<"USERS", "Row">>()

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
    formState: { errors: passwordErrors },
  } = useForm<FindPasswordInput>();

  // 이메일 찾기
  const findEmailHandler: SubmitHandler<FindEmailInput> = async (data) => {
    const { nicknameForEmail, phoneMidNumForEmail, phoneLastNumForEmail } = data

    if (selectPhoneFistNum === undefined) {
      emailSetError("phoneMidNumForEmail", { message: "휴대전화 앞자리를 선택해주세요." });
      return;
    }

    const phonePattern = /^01([0-9])-?([0-9]{3,4})-?([0-9]{4})$/
    const phone = `${selectPhoneFistNum}${phoneMidNumForEmail}${phoneLastNumForEmail}`;
    if (!phonePattern.test(phone)) {
      emailSetError("phoneMidNumForEmail", { message: "휴대전화 형식이 올바르지 않습니다." });
      return;
    }

    await findEmail({ name: nicknameForEmail, phone })
      .then((data) => {
        setIsDoneFind(true)
        setFindUser(data)
      }).catch(() => {
        emailSetError("root", { message: "해당 유저를 찾을 수 없습니다." })
        setIsDoneFind(false)
      })
  };

  // 비밀번호 찾기 
  const findPasswordHandler: SubmitHandler<FindPasswordInput> = async (data) => {
    const { emailForPassword, nicknameForPassword, phoneMidNumForPassword, phoneLastNumForPassword } = data;
    // TODO
    // 휴대폰 번호 가공하기
    if (selectPhoneFistNum === undefined) {
      emailSetError("phoneMidNumForEmail", { message: "휴대전화 앞자리를 선택해주세요." });
      return;
    }

    const phonePattern = /^01([0-9])-?([0-9]{3,4})-?([0-9]{4})$/
    const phone = `${selectPhoneFistNum}${phoneMidNumForPassword}${phoneLastNumForPassword}`;
    if (!phonePattern.test(phone)) {
      emailSetError("phoneMidNumForEmail", { message: "휴대전화 형식이 올바르지 않습니다." });
      return;
    }

    await findPassword({ name: nicknameForPassword, phone, email: emailForPassword })
      .then(async (data) => {
        await sendEmailForFindPassword(data.email);
        alert("이메일이 전송되었습니다.");
        navigate("/");
      }).catch(() => {
        emailSetError("root", { message: "해당 유저를 찾을 수 없습니다." })
      })
  };

  useEffect(() => {
    return () => {
      // TODO
      // 찾은 데이터 state 초기화
    };
  }, []);

  return (
    <>
      <div className="w-[560px] flex-column items-center gap-[40px] mx-auto text-[12px] font-normal leading-[110%]">
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
          <form onSubmit={emailHandleSubmit(findEmailHandler)} className="flex-column w-full gap-[14px]">
            <div className="flex-column gap-[8px]">
              <label htmlFor="nicknameForEmail">닉네임</label>
              <input
                id="nicknameForEmail"
                {...emailRegister("nicknameForEmail", { required: "닉네임을 입력해주세요" })}
                placeholder="닉네임을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={emailErrors.nicknameForEmail?.message} size={20} />

            <div className="flex-column gap-[8px]">
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
                  {...emailRegister("phoneMidNumForEmail")}
                  type="text"
                  placeholder="휴대전화"
                  className="text-center auth-input body-3"
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...emailRegister("phoneLastNumForEmail")}
                  type="text"
                  placeholder="휴대전화"
                  className="text-center auth-input body-3"
                />
              </div>
            </div>
            <InvalidText errorsMessage={emailErrors.phoneMidNumForEmail?.message} size={20} />

            <button className="text-center auth-button bg-point body-3 point-button-hover">
              아이디 찾기
            </button>
            <InvalidText errorsMessage={emailErrors.root?.message} size={20} />
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
                <p className="text-gray03 text-[12px] w-full">(2023.08.24 가입)</p>
              </div>
            </div>
            <Link
              to="/login"
              className="text-center auth-button bg-point body-3 point-button-hover"
            >
              로그인
            </Link>
            <div className="text-gray03 text-[12px] font-normal leading-[130%]">
              <p>SNS로 가입하신 계정은 비밀번호를 재설정할 수 없습니다.</p>
              <p>로그인 화면에서 SNS계정으로 로그인 하신 후 이용해주세요.</p>
            </div>
          </>
        )}

        {/* 비밀번호 찾기 */}
        {focusTab.focusPassword && !isDoneFind && (
          <form onSubmit={passwordHandleSubmit(findPasswordHandler)} className="flex-column w-full gap-[14px]">
            <div className="flex-column gap-[8px]">
              <label>이메일</label>
              <input
                {...passwordRegister("emailForPassword", { required: "이메일을 입력해주세요." })}
                placeholder="이메일을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={passwordErrors.emailForPassword?.message} size={20} />

            <div className="flex-column gap-[8px]">
              <label>닉네임</label>
              <input
                {...passwordRegister("nicknameForPassword")}
                placeholder="닉네임을 입력해주세요."
                className="auth-input body-3"
              />
            </div>
            <InvalidText errorsMessage={passwordErrors.nicknameForPassword?.message} size={20} />

            <div className="flex-column gap-[8px]">
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
                  className="text-center auth-input body-3"
                />
                <span className="mx-[12px]">-</span>
                <input
                  {...passwordRegister("phoneLastNumForPassword", {
                    pattern: { value: /^[0-9]{4}$/, message: "휴대전화 형식이 올바르지 않습니다." },
                  })}
                  type="text"
                  placeholder="휴대전화"
                  className="text-center auth-input body-3"
                />
              </div>
            </div>
            <InvalidText errorsMessage={passwordErrors.phoneMidNumForPassword?.message} size={20} />

            <button className="text-center auth-button bg-point body-3 point-button-hover">
              비밀번호 찾기 || 메일로 새 비밀번호 받기
            </button>
          </form>
        )}
      </div>
    </>
  );
};
