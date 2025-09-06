import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f5f6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f4f5f6;
  position: relative;
`;

export const HeaderSection = styled.div`
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 120px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 20px;
    width: auto;
    object-fit: contain;
  }
`;

export const AuthContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 64px;
  box-sizing: border-box;
`;

export const AuthModal = styled.div`
  width: 379px;
  height: 334px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthBlock = styled.div`
  width: 313px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.219em;
    text-align: center;
    color: #000000;
    margin: 0;
  }
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthFormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 0.5px solid #999999;
  border-radius: 6px;
  background-color: #ffffff;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #000000;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #999999;
  }

  &:focus {
    border-color: #7334ea;
  }

  ${(props) =>
    props.$hasError &&
    `
    border-color: #ff6b6b;
  `}
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #7334ea;
  border: none;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.219em;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  margin-top: 12px;

  &:hover {
    background-color: #5a28c7;
  }

  &:disabled {
    background-color: #999999;
    cursor: not-allowed;
  }
`;

export const AuthFormGroup2 = styled.div`
  width: 314px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
`;

export const AuthFormP = styled.p`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: center;
  color: #999999;
  margin: 0;
  margin-top: 4px;

  a {
    color: #999999;
    text-decoration: underline;
    text-decoration-color: #999999;

    &:hover {
      color: #7334ea;
      text-decoration-color: #7334ea;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 4px;
  margin-left: 12px;
`;

export const HelpText = styled.div`
  color: #999999;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 4px;
  margin-left: 12px;
`;
