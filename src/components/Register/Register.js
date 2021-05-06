import { memo } from "react";
import AuthForm from "../AuthForm/AuthForm";

const Register = () => (
  <AuthForm
    title="Добро пожаловать!"
    submitButton="Зарегистрироваться"
    ask="Уже зарегистрированы?"
    path="/signin"
    welcome="Войти"
    isRegister={true}
    isDisabled={false}
  />
)

export default memo(Register)
