import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {useEffect, useState} from "react";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as MestoAuth from "../MestoAuth";
import successLogoPath from "../images/tooltip/success.svg";
import failureLogoPath from "../images/tooltip/failure.svg";

function App() {

    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: '',
        email: '',
        password: '',
    })

    const [tooltipData, setToolTipData] = useState({
        title: '',
        img: '',
        isOpen: false,
    })

    const [selectedCard, setSelectedCard] = useState(null);

    const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);

    const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);

    const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);

    const [isDeleteConfirmPopupOpen, setDeleteConfirmPopup] = useState(false);

    const [isImagePopupOpen, setImagePopupOpen] = useState(false);

    const [cards, setCards] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        api.getProfile()
            .then(
            (userData) => {
                setCurrentUser({
                    ...currentUser,
                    name: userData.name,
                    about: userData.about,
                    avatar: userData.avatar,
                    _id: userData._id
                })
            })
            .catch(
                (error) => {
                    console.log(
                        `Произошла ошибка при получении данных профиля пользователя - ${error}`
                );
        })
    }, [loggedIn]);

    useEffect(() => {
        api.getCards().then(
            (cardsData) => {
                setCards(cardsData);
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка получении карточек с сервера - ${error}`
                );
            }
        )}, [loggedIn]);

    function handleEditAvatarClick() {
        setEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true);
    }

    function  handleAddPlaceClick() {
        setAddPlacePopup(true);
    }

    function closeAllPopups() {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setAddPlacePopup(false);
        setDeleteConfirmPopup(false);
        setImagePopupOpen(false);
        setToolTipData({
            ...tooltipData,
            isOpen: false
        });
        setSelectedCard(null);
    }

    function handleCardClick(cardData) {
        setSelectedCard(cardData);
        setImagePopupOpen(true);
    }

    function handleDeleteConfirmClick(cardData) {
        setDeleteConfirmPopup(true);
        setSelectedCard(cardData);
    }

    function handleUpdateProfile(data) {
        api.updateProfile(data)
            .then((res) => {

                setCurrentUser({
                    ...currentUser,
                    name: res.name,
                    about: res.about,
                })

                closeAllPopups();
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка при обновлении профиля пользователя - ${error}`
                );
            })
    }

    function handleUpdateAvatar(newUrl) {
        api.updateAvatar(newUrl.avatar)
            .then((res) => {
                setCurrentUser({
                    ...currentUser,
                    avatar: res.avatar,
                })

                closeAllPopups();
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка при обновлении аватара пользователя - ${error}`
                );
            }
        )
    }

    function handleAddPlaceSubmit(newData) {
        api.addCard(newData)
            .then((newCard) => {
                setCards([newCard, ...cards])

                closeAllPopups();
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка при создании новой карточки - ${error}`
                );
            }
        )
    }

    function handleCardLike(card) {
        const { likes, _id } = card;
        // проверяем лайк
        const isLiked = likes.some(like => like._id === currentUser._id);
        // отправляем запрос в АПИ и получаем обновленные данные карточки
        api.changeLikeCardStatus(_id, !isLiked)
            .then((newCard) => {
                setCards(
                    (state) => state.map(
                        c => c._id === card._id ? newCard : c
                    )
                )
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка при лайке/дизлайке карточки - ${error}`
                );
            }
        );
    }

    function handleCardRemove(card) {
        api.deleteCard(card._id)
            .then(() => {

                setCards(
                    (state) => state.filter((
                            c => c._id !== card._id
                        )
                    ))
            })
            .catch(
            (error) => {
                console.log(
                    `Произошла ошибка при удалении карточки - ${error}`
                );
            }
        )
    }

    useEffect(() => {

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            auth(jwt)
                .then(
                    (res) => {

                        const { data } = res;

                        setCurrentUser({
                            ...currentUser,
                            email: data.email,
                        })

                        setLoggedIn(true);
                    })
                .catch(err => console.log(`Произошла ошибка - ${err}, при аутентификации с токеном - ${jwt}`))
        }
    }, []);

    useEffect(() => {

        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);


    const auth = async (jwt) => {
        return await MestoAuth.getContent(jwt);
    }

    function handleChangeEmail(evt) {
        setCurrentUser({
            ...currentUser,
            email: evt.target.value,
        });
    }

    function handleChangePassword(evt) {
        setCurrentUser({
            ...currentUser,
            password: evt.target.value,
        });
    }

    function onLogin({email, password}) {
        return MestoAuth.authorize(email, password)
            .then((res) => {

                const { token } = res;

                localStorage.setItem('jwt', token);
                setLoggedIn(true);
        })
            .then(() => {
                history.push('/');
            })
            .then(() => {
                setCurrentUser({
                    ...currentUser,
                    email: '',
                    password: '',
                })
            })
            .catch((err) => console.log(`Произошла ошибка при попытке авторизации - ${err}`))
    }

    function onRegister({ email, password }) {
        return MestoAuth.register(email, password)
            .then((res) => {

                if (!res.error) {

                    setToolTipData({
                        ...tooltipData,
                        title: "Вы успешно зарегистрировались!",
                        img: successLogoPath,
                        isOpen: true,
                    })

                    const { data } = res;

                    setCurrentUser({
                        ...currentUser,
                        email: data.email,
                    });

                    setTimeout(() => {
                        closeAllPopups();
                        history.push("/sign-in");
                    }, 3000);

                } else {

                    setToolTipData({
                        ...tooltipData,
                        title: res.error,
                        img: failureLogoPath,
                        isOpen: true,
                    })

                    setTimeout(() => {
                        closeAllPopups();
                    }, 3000);
                }
            })
            .catch((err) => console.log(`Произошла ошибка при попытке зарегистрировать аккаунт - ${err}`))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <Header email={currentUser.email} />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onRemoveBtnClick={handleDeleteConfirmClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                    />
                    <Route path="/sign-in">
                        <Login
                            onLogin={onLogin}
                            onChangeEmail={handleChangeEmail}
                            onChangePassword={handleChangePassword}
                            email={currentUser.email}
                            password={currentUser.password}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            onRegister={onRegister}
                            onChangeEmail={handleChangeEmail}
                            onChangePassword={handleChangePassword}
                            email={currentUser.email}
                            password={currentUser.password}
                            closeAllPopups={closeAllPopups}
                        />
                        <InfoTooltip
                            title={tooltipData.title}
                            image={tooltipData.img}
                            isOpen={tooltipData.isOpen}
                            onClose={closeAllPopups}
                        />
                    </Route>
                </Switch>
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUserProfile={handleUpdateProfile}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <ConfirmDeletePopup
                        formClassName="popup popup_id_delete-confirm"
                        name="delete-confirm"
                        wrapperClass="popup__wrapper popup__wrapper_type_confirm"
                        title="Вы уверены?"
                        submitButtonTitle="Да"
                        onRemoveCard={handleCardRemove}
                        isOpen={isDeleteConfirmPopupOpen}
                        onClose={closeAllPopups}
                        card={selectedCard}
                    />
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
