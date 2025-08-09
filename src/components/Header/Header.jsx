import { useState } from "react";
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

function Header({ onShowExitModal }) {
  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const handleLogoutClick = () => {
    setShowUserPopup(false); // Закрываем попап пользователя
    onShowExitModal(); // Показываем модальное окно выхода
  };

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
            <NewTaskButton id="btnMainNew">
              <a href="/new-task">Создать новую задачу</a>
            </NewTaskButton>
            <UserButton onClick={toggleUserPopup}>Ivan Ivanov</UserButton>
            <UserPopup $isVisible={showUserPopup}>
              <UserName>Ivan Ivanov</UserName>
              <UserEmail>ivan.ivanov@gmail.com</UserEmail>
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
