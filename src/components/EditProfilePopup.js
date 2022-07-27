import {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleAboutChange(evt) {
        setAbout(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUserProfile({
            name,
            about,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            formClassName="popup popup_id_profile-edit"
            name="profile-edit"
            wrapperClass="popup__wrapper popup__wrapper_type"
            title="Редактировать профиль"
            submitButtonTitle="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    type="text"
                    className="popup__input popup__input_type_name"
                    id="popup__input-nickname"
                    name="name"
                    aria-label="Поле ввода имени пользователя"
                    value={name}
                    onChange={handleNameChange}
                    minLength="2"
                    maxLength="40"
                    autoComplete="off"
                    required
                />
                <span className="popup__input-error popup__input-nickname-error"></span>
            </label>
            <label className="popup__label">
                <input
                    type="text"
                    className="popup__input popup__input_type_about"
                    id="popup__input-about"
                    name="about"
                    aria-label="Поле ввода информации о пользователе"
                    value={about}
                    onChange={handleAboutChange}
                    minLength="2"
                    maxLength="200"
                    autoComplete="off"
                    required
                />
                <span className="popup__input-error popup__input-about-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
