import * as yup from "yup";
export const loginSchema = yup.object().shape({
  username: yup.string().required("User Name is required"),
});
