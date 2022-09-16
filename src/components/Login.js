import React from 'react';
import PopupWithForm from "./PopupWithForm";

const Login = (props) => {

    const { email, password } = props

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onLogin(email, password);
    }

    return (
        <PopupWithForm
            formClassName="login"
            name="login"
            wrapperClass="login__wrapper"
            title="Вход"
            submitButtonTitle="Войти"
            onSubmit={handleSubmit}
        >
            <label className="login__label">
                <input
                    type="email"
                    className="login__input register_type_email"
                    id="login-email"
                    name="email"
                    aria-label="Поле ввода электронной почты пользователя"
                    placeholder="Email"
                    onChange={props.onChangeEmail}
                    value={email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    autoComplete="off"
                    required
                />
                <span className="login__input-error login__input-error_type_email" />
            </label>
            <label className="login__label">
                <input
                    type="password"
                    className="login__input login__input_type_password"
                    id="login-password"
                    name="password"
                    aria-label="Поле ввода пароля"
                    placeholder="Пароль"
                    onChange={props.onChangePassword}
                    value={password}
                    minLength="6"
                    maxLength="20"
                    autoComplete="off"
                    required
                />
                <span className="login__input-error login__input-error_type_password" />
            </label>
        </PopupWithForm>
    );
};

export default Login;
