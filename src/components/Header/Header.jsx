import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Container } from "../../App.styled";
import {
  HeaderContainer,
  HeaderBlock,
  LogoContainer,
  HeaderNav,
  NewTaskButton,
  UserButton,
  UserPopup,
  UserName,
  UserEmail,
  ThemeContainer,
  ThemeCheckbox,
  LogoutButton,
} from "./Header.styled";

function Header({ onShowExitModal, onShowNewCardModal }) {
  const { user } = useAuth();
  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const handleLogoutClick = () => {
    setShowUserPopup(false); // Закрываем попап пользователя
    onShowExitModal(); // Показываем модальное окно выхода
  };

  const handleNewTaskClick = () => {
    onShowNewCardModal(); // Показываем модальное окно создания задачи
  };

  // Получаем данные пользователя или fallback значения
  const userName = user?.name || "Пользователь";
  const userEmail = user?.login || user?.email || "user@example.com";

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <LogoContainer className="_show _light">
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </LogoContainer>
          <LogoContainer className="_dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </LogoContainer>
          <HeaderNav>
            <NewTaskButton id="btnMainNew" onClick={handleNewTaskClick}>
              Создать новую задачу
            </NewTaskButton>
            <UserButton onClick={toggleUserPopup}>{userName}</UserButton>
            <UserPopup $isVisible={showUserPopup}>
              <UserName>{userName}</UserName>
              <UserEmail>{userEmail}</UserEmail>
              <ThemeContainer>
                <p>Темная тема</p>
                <ThemeCheckbox name="checkbox" />
              </ThemeContainer>
              <LogoutButton type="button" onClick={handleLogoutClick}>
                Выйти
              </LogoutButton>
            </UserPopup>
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
