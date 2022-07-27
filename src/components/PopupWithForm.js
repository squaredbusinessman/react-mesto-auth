import React, {useEffect} from 'react';

function PopupWithForm(props) {

    const formMainClass = props.formClassName.split(' ').shift();

    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }

        document.onkeydown = handleEscClose;
    }, []);

    useEffect(() => {
        function handleOverlayClose(evt) {
            evt.stopPropagation();
            if (evt.target.classList.contains('popup_visible')) {
                props.onClose();
            }
        }

        document.onmousedown = handleOverlayClose;
    }, []);

    return (
        <div className={`${props.formClassName} ${props.isOpen ? 'popup_visible' : ''}`}>
            <div className={`${props.wrapperClass}`}>
                <h2 className={`${formMainClass}__title`}>
                    {props.title}
                </h2>
                <form
                    className={`${formMainClass}__form`}
                    name={props.name}
                    action="src/components/App#"
                    method="post"
                    onSubmit={props.onSubmit}>

                    {props.children}

                    <button
                        type="submit"
                        className={`${formMainClass}__save-btn`}
                        aria-label="Кнопка отправки формы"
                    >
                        {props.submitButtonTitle}
                    </button>
                    {
                        props.isRegisterForm
                        &&
                        <span className="register__go-login">
                            Уже зарегистрированы?&nbsp;
                            <a className="register__go-login_link" href="/sign-in">
                                Войти
                            </a>
                        </span>
                    }
                </form>
                {
                    props.onClose
                    &&
                    <button
                        onClick={props.onClose}
                        type="button"
                        className="popup__close-btn"
                        aria-label="Кнопка закрытия попапа"
                    ></button>
                }
            </div>
        </div>
    );
}

export default PopupWithForm;
