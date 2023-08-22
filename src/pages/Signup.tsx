import { useState } from "react";

import { SignupComplete, SignupForm, TermsOfUse } from "components/signup";

export type Step = 0 | 1 | 2;
export const Signup = () => {
  const [step, setStep] = useState<Step>(0);

  const nextStep = () => {
    setStep((prev) => {
      switch (prev) {
        case 0:
          return 1;
        case 1:
          return 2;
        default:
          return 0;
      }
    });
  };

  const prevStep = () => {
    setStep((prev) => {
      switch (prev) {
        case 2:
          return 1;
        case 1:
          return 0;
        default:
          return 2;
      }
    });
  };

  return (
    <>
      {step === 0 && <TermsOfUse nextStep={nextStep} />}
      {step === 1 && <SignupForm prevStep={prevStep} nextStep={nextStep} />}
      {step === 2 && <SignupComplete />}
    </>
  );
};
