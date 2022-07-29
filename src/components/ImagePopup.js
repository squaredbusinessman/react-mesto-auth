import React, {useEffect} from 'react';

const ImagePopup = (props) => {

    function handleOverlayClose(evt) {
        evt.stopPropagation();
        if (evt.target.classList.contains('popup_visible')) {
            props.onClose();
        }
    }

    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            props.onClose();
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }

    }, [props.isOpen]);

    return (
        <div onClick={handleOverlayClose} className={`popup popup_id_big-picture ${props.isOpen && 'popup_visible'}`}>
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
                />
            </div>
        </div>
    );
};

export default ImagePopup;
