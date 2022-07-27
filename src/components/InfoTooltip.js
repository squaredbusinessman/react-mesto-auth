import React from 'react';

const InfoTooltip = (props) => {
    return (
        <div className={`popup ${props.isOpen && "popup_visible"}`}>
            <div className="popup__container popup__container_type_tooltip">
                <img
                    className="popup__img popup__img_type_tooltip"
                    src={props.image}
                    alt="иконка попытки регистрации аккаунта"
                />
                <p className="popup__name popup__name_type_tooltip">{`${props.title}`}</p>
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close-btn"
                    aria-label="Кнопка закрытия попапа"
                ></button>
            </div>
        </div>
    );
};

export default InfoTooltip;
