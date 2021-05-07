import { memo } from "react";
import AuthForm from "../AuthForm/AuthForm";

const Login = () => (
  <AuthForm
    title="Рады видеть!"
    submitButton="Войти"
    ask="Ещё не зарегистрированы?"
    path="/signup"
    welcome="Регистрация"
    isDisabled={true}
  />
)

export default memo(Login)
