import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PageWrapper,
  AuthContainer,
  AuthModal,
  AuthBlock,
  AuthTitle,
  AuthForm,
  AuthFormGroup,
  AuthInput,
  AuthButton,
  AuthFormGroup2,
  AuthFormP,
  ErrorMessage,
} from "./LoginPage.styled";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  // Правильные учетные данные для демонстрации
  const VALID_EMAIL = "ivan.ivanov@gmail.com";
  const VALID_PASSWORD = "password123";

  // Функция для валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Валидация в реальном времени
    const newErrors = { ...errors };

    if (!newEmail.trim()) {
      newErrors.email = "Поле email обязательно для заполнения";
    } else if (!validateEmail(newEmail)) {
      newErrors.email = "Введите корректный email адрес";
    } else {
      delete newErrors.email;
    }

    setErrors(newErrors);

    // Очищаем ошибку аутентификации
    if (authError) {
      setAuthError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Валидация в реальном времени
    const newErrors = { ...errors };

    if (!newPassword.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    } else {
      delete newErrors.password;
    }

    setErrors(newErrors);

    // Очищаем ошибку аутентификации
    if (authError) {
      setAuthError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Принудительная валидация при отправке формы
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Поле email обязательно для заполнения";
    } else if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    if (!password.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setAuthError("");

    // Имитация проверки логина
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        onLogin();
        navigate("/");
      } else {
        // Неверные учетные данные
        setAuthError(
          "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа."
        );
        setErrors({
          email: "invalid",
          password: "invalid",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PageWrapper>
      <AuthContainer>
        <AuthModal>
          <AuthBlock>
            <AuthTitle>
              <h2>Вход</h2>
            </AuthTitle>
            <AuthForm onSubmit={handleSubmit}>
              <AuthFormGroup>
                <AuthInput
                  type="email"
                  placeholder="Эл.почта"
                  value={email}
                  onChange={handleEmailChange}
                  $hasError={!!errors.email || !!authError}
                  required
                />
                {errors.email && errors.email !== "invalid" && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={!!errors.password || !!authError}
                  required
                />
                {errors.password && errors.password !== "invalid" && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </AuthFormGroup>

              {authError && (
                <AuthFormGroup>
                  <ErrorMessage
                    style={{ textAlign: "center", marginTop: "10px" }}
                  >
                    {authError}
                  </ErrorMessage>
                </AuthFormGroup>
              )}

              <AuthFormGroup2>
                <AuthButton type="submit" disabled={isLoading}>
                  {isLoading ? "Вход..." : "Войти"}
                </AuthButton>
                <AuthFormP>
                  Нужно зарегистрироваться?{" "}
                  <Link to="/register">Регистрируйтесь здесь</Link>
                </AuthFormP>
              </AuthFormGroup2>
            </AuthForm>
          </AuthBlock>
        </AuthModal>
      </AuthContainer>
    </PageWrapper>
  );
}

export default LoginPage;
