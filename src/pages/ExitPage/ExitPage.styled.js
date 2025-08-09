import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #eaeef6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ExitContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ExitModal = styled.div`
  width: 368px;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 40px 30px;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const ExitBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ExitTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;

  h2 {
    color: #000;
  }
`;

export const ExitText = styled.div`
  text-align: center;
  margin-bottom: 30px;

  p {
    font-size: 14px;
    color: #000;
    line-height: 150%;
  }
`;

export const ExitButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`;

export const ExitButtonYes = styled.button`
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }
`;

export const ExitButtonNo = styled.button`
  width: 100%;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid #565eef;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #565eef;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;
