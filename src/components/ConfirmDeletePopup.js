import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = (props) => {

    function handleRemoveCard(evt) {
        evt.preventDefault();

        props.onRemoveCard(props.card)
        props.onClose();
    }


    return (
        <PopupWithForm
            formClassName={props.formClassName}
            name={props.name}
            wrapperClass={props.wrapperClass}
            title={props.title}
            submitButtonTitle={props.submitButtonTitle}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleRemoveCard}
        />
    );
};

export default ConfirmDeletePopup;
