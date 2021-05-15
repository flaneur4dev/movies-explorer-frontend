import { memo } from "react";
import AuthForm from "../AuthForm/AuthForm";

const Register = props => (
  <AuthForm
    title="Добро пожаловать!"
    submitButton="Зарегистрироваться"
    ask="Уже зарегистрированы?"
    path="/signin"
    welcome="Войти"
    isRegister={true}
    isDisabled={props.isDisabled}
    errors={props.errors}
    info={props.info}
    handleChange={props.handleChange}
    onSubmit={props.onRegister}
  />
)

export default memo(Register)
