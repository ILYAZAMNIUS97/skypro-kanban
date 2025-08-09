import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  ExitContainer,
  ExitModal,
  ExitBlock,
  ExitTitle,
  ExitText,
  ExitButtons,
  ExitButtonYes,
  ExitButtonNo,
} from "./ExitPage.styled";

function ExitPage({ onLogout }) {
  const navigate = useNavigate();

  const handleExit = () => {
    onLogout();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <PageWrapper>
      <ExitContainer>
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
              <ExitButtonNo onClick={handleCancel}>Нет, остаться</ExitButtonNo>
            </ExitButtons>
          </ExitBlock>
        </ExitModal>
      </ExitContainer>
    </PageWrapper>
  );
}

export default ExitPage;
