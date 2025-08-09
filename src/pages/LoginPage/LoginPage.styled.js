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

export const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthModal = styled.div`
  width: 368px;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 40px 30px;
`;

export const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthTitle = styled.div`
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

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AuthFormGroup = styled.div`
  margin-bottom: 7px;
`;

export const AuthFormGroup2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthInput = styled.input`
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid ${(props) => (props.$hasError ? "#ff6b6b" : "#d4dbe5")};
  outline: none;
  padding: 10px 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    color: #94a6be;
  }

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#ff6b6b" : "#94a6be")};
  }
`;

export const AuthButton = styled.button`
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
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }

  &:disabled {
    background-color: #94a6be;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  margin-top: 4px;
  margin-left: 8px;
`;

export const AuthFormP = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;

  a {
    text-decoration: underline;
    color: #565eef;
  }
`;
