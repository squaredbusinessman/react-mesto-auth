import React, {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

    const inputUrlRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: inputUrlRef.current.value,
        });
    }

    useEffect(() => {
        inputUrlRef.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            formClassName="popup popup_id_new-avatar"
            name="new-avatar"
            wrapperClass="popup__wrapper popup__wrapper_type_avatar"
            title="Обновить аватар"
            submitButtonTitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    className="popup__input popup__input_type-url"
                    type="url"
                    id="popup__input-avatar-url"
                    name="newAvatarUrl"
                    placeholder="Ссылка на картинку"
                    aria-label="Поле ввода для ссылки на новый аватар"
                    pattern="https?://.+"
                    required
                    ref={inputUrlRef}
                />
                <span className="popup__input-error popup__input-avatar-url-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
