import { isPhoneNumber } from "./constants.js";

export const signupEmailAndMobileValidator = (password, mobile) => {
  const error = [];
  if (mobile && !isPhoneNumber.test(mobile.toString())) {
    error.push("Invalid mobile number!");
  }
  if (password.length < 8) {
    error.push("Password too short. Atleast 8 characters is must!");
  }
  return error;
};
