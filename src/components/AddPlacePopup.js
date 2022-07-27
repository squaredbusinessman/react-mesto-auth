import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    const placeNameRef = useRef();

    const placeUrlRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: placeNameRef.current.value,
            link: placeUrlRef.current.value,
        })
    }

    useEffect(() => {
        placeNameRef.current.value = '';
        placeUrlRef.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            formClassName="popup popup_id_new-post"
            wrapperClass="popup__wrapper"
            name="new-post"
            title="Новое место"
            submitButtonTitle="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    type="text"
                    className="popup__input popup__input_type_name"
                    id="popup__input-place-name"
                    name="name"
                    aria-label="Поле ввода названия"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    autoComplete="off"
                    required
                    ref={placeNameRef}
                />
                <span className="popup__input-error popup__input-place-name-error"></span>
            </label>
            <label className="popup__label">
                <input
                    type="url"
                    className="popup__input popup__input_type_about"
                    id="popup__input-src"
                    name="link"
                    aria-label="Поле ввода ссылки"
                    placeholder="Ссылка на картинку"
                    autoComplete="off"
                    required
                    ref={placeUrlRef}
                />
                <span className="popup__input-error popup__input-src-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
