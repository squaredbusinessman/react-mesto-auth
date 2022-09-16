import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const Register = (props) => {

    const { email, password } = props;

    function handleSubmit(evt) {
        evt.preventDefault();

        if (password) {
            props.onRegister(email, password);
        }
    }

    return (
        <PopupWithForm
            formClassName="register"
            name="register"
            wrapperClass="register__wrapper"
            title="Регистрация"
            submitButtonTitle="Зарегистрироваться"
            onSubmit={handleSubmit}
            isRegisterForm={true}
        >
            <label className="register__label">
                <input
                    type="email"
                    className="register__input register_type_email"
                    id="register-email"
                    name="email"
                    aria-label="Поле ввода электронной почты пользователя"
                    placeholder="Email"
                    onChange={props.onChangeEmail}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    autoComplete="off"
                    value={email}
                    required
                />
                <span className="register__input-error register__input-error_type_email" />
            </label>
            <label className="register__label">
                <input
                    type="password"
                    className="register__input register__input_type_password"
                    id="register-password"
                    name="password"
                    aria-label="Поле ввода пароля"
                    placeholder="Пароль"
                    onChange={props.onChangePassword}
                    minLength="6"
                    maxLength="20"
                    autoComplete="off"
                    value={password}
                    required
                />
                <span className="register__input-error register__input-error_type_password" />
            </label>
        </PopupWithForm>
    );
};

export default Register;
