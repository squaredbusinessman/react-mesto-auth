import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="user">
                <div className="user__avatar-wrapper">
                    <img
                        className="user__avatar"
                        src={currentUser.avatar}
                        alt="Аватарка пользователя"
                    />
                    <button
                        onClick={props.onEditAvatar}
                        type="button"
                        className="user__avatar-editor-btn"
                        aria-label="Кнопка редактирования аватара пользователя"
                    ></button>
                </div>
                <div className="user__text-wrapper">
                    <h1 className="user__name">{currentUser.name}</h1>
                    <button
                        onClick={props.onEditProfile}
                        type="button"
                        className="user__nick-editor-btn"
                        aria-label="Кнопка редактирования Имени и доп. информации пользователя"
                    ></button>
                    <p className="user__about">{currentUser.about}</p>
                </div>
                <button
                    onClick={props.onAddPlace}
                    type="button"
                    className="user__add-post-btn"
                    aria-label="Кнопка создания новой публикации"
                ></button>
            </section>
            <section>
                <ul className="cards">
                    {props.cards.map(card => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onRemoveBtnClick={props.onRemoveBtnClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
