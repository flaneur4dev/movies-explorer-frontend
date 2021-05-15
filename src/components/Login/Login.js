import { memo } from "react";
import AuthForm from "../AuthForm/AuthForm";

const Login = props => (
  <AuthForm
    title="Рады видеть!"
    submitButton="Войти"
    ask="Ещё не зарегистрированы?"
    path="/signup"
    welcome="Регистрация"
    isDisabled={props.isDisabled}
    errors={props.errors}
    info={props.info}
    handleChange={props.handleChange}
    onSubmit={props.onLogin}
  />
)

export default memo(Login)
