import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import PopNewCard from "../../components/popups/PopNewCard/PopNewCard";
import PopBrowse from "../../components/popups/PopBrowse/PopBrowse";
import PopUser from "../../components/popups/PopUser/PopUser";
import { Wrapper } from "../../App.styled";
import {
  ExitContainer,
  ExitModal,
  ExitBlock,
  ExitTitle,
  ExitText,
  ExitButtons,
  ExitButtonYes,
  ExitButtonNo,
} from "../ExitPage/ExitPage.styled";

function MainPage({ onLogout }) {
  const [showExitModal, setShowExitModal] = useState(false);
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const navigate = useNavigate();

  // Реф для доступа к методу обновления задач в Main компоненте
  const mainRef = useRef();

  // Закрытие модального окна по клавише Escape
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        if (showExitModal) {
          setShowExitModal(false);
        }
        if (showNewCardModal) {
          setShowNewCardModal(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [showExitModal, showNewCardModal]);

  // Предотвращение прокрутки страницы когда модальное окно открыто
  useEffect(() => {
    if (showExitModal || showNewCardModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showExitModal, showNewCardModal]);

  const handleShowExitModal = () => {
    setShowExitModal(true);
  };

  const handleHideExitModal = () => {
    setShowExitModal(false);
  };

  const handleShowNewCardModal = () => {
    setShowNewCardModal(true);
  };

  const handleHideNewCardModal = () => {
    setShowNewCardModal(false);
  };

  const handleTaskCreated = (newTasksList) => {
    console.log("Новая задача создана:", newTasksList);
    // Обновляем список задач в Main компоненте
    if (mainRef.current && mainRef.current.updateTasks) {
      mainRef.current.updateTasks(newTasksList);
    }
  };

  const handleOverlayClick = (e) => {
    // Закрываем модальное окно только если клик был по фону, а не по самому модальному окну
    if (e.target === e.currentTarget) {
      setShowExitModal(false);
    }
  };

  const handleExit = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Wrapper>
      <PopUser />
      <PopNewCard
        isVisible={showNewCardModal}
        onClose={handleHideNewCardModal}
        onTaskCreated={handleTaskCreated}
      />
      <PopBrowse />
      <Header
        onShowExitModal={handleShowExitModal}
        onShowNewCardModal={handleShowNewCardModal}
      />
      <Main ref={mainRef} />

      {showExitModal && (
        <ExitContainer onClick={handleOverlayClick}>
          <ExitModal>
            <ExitBlock>
              <ExitTitle>
                <h2>Выйти из аккаунта?</h2>
              </ExitTitle>
              <ExitText>
                <p>Вы действительно хотите выйти?</p>
              </ExitText>
              <ExitButtons>
                <ExitButtonYes onClick={handleExit}>Да, выйти</ExitButtonYes>
                <ExitButtonNo onClick={handleHideExitModal}>
                  Нет, остаться
                </ExitButtonNo>
              </ExitButtons>
            </ExitBlock>
          </ExitModal>
        </ExitContainer>
      )}
    </Wrapper>
  );
}

export default MainPage;
