import React, {useEffect} from 'react';

function PopupWithForm(props) {

    const formMainClass = props.formClassName.split(' ').shift();

    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            props.onClose();
        }
    }

    function handleOverlayClose(evt) {
        evt.stopPropagation();
        if (evt.target.classList.contains('popup_visible')) {
            props.onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }

    }, [props.isOpen]);

    return (
        <div
            onClick={handleOverlayClose}
            className={`${props.formClassName} ${props.isOpen ? 'popup_visible' : ''}`}
        >
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
                    />
                }
            </div>
        </div>
    );
}

export default PopupWithForm;
