import { SignInFormData, SignUpFormData } from "../pages";

const formData = new FormData();
export const transformSignInData = (data: SignInFormData) => {
  formData.append("username", data.email);
  formData.append("password", data.password);

  return formData;
};

export const transformSignUpData = (data: SignUpFormData) => {
  formData.append("username", data.email);
  formData.append("password", data.password);
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append("zip_code", data.zipCode);

  return formData;
};
