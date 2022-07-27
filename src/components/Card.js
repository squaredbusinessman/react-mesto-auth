import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {

    function selectedCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleRemoveClick() {
        props.onRemoveBtnClick(props.card);
    }

    const currentUser = useContext(CurrentUserContext);

    // Определяем владельца карточки
    const isOwner = props.card.owner._id === currentUser._id;

    const cardRemoveButtonClassName = (
        `card__remove ${isOwner ? `card__remove_visible` : ''}`
    );

    // Проверяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like ${isLiked ? `card__like_active` : ''}`
    );


    return (
        <li className="card">
            <img
                onClick={selectedCardClick}
                className="card__pic"
                src={props.card.link}
                alt={props.card.name}
            />
            <div className="card__text-wrapper">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-wrapper">
                    <button
                        onClick={handleLikeClick}
                        type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Кнопка нравится"
                    ></button>
                    <span className="card__likes-counter">{props.card.likes.length}</span>
                </div>
            </div>
            <button
                onClick={handleRemoveClick}
                type="button"
                className={cardRemoveButtonClassName}
                aria-label="Кнопка удаления поста"
            ></button>
        </li>
    );
};

export default Card;
