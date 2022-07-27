import React from 'react';

const ImagePopup = (props) => {
    return (
        <div className={`popup popup_id_big-picture ${props.isOpen && 'popup_visible'}`}>
            <div className="popup__container">
                <img
                    className="popup__img"
                    src={props.card?.link}
                    alt={props.card?.name}
                />
                <p className="popup__name">{props.card ? props.card.name : ''}</p>
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

export default ImagePopup;
