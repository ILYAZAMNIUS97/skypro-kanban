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
} from "./RegisterPage.styled";

function RegisterPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Функция для валидации email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Функция для валидации формы
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Поле имя обязательно для заполнения";
    }

    if (!email.trim()) {
      newErrors.email = "Поле email обязательно для заполнения";
    } else if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    if (!password.trim()) {
      newErrors.password = "Поле пароль обязательно для заполнения";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Проверяем, валидна ли форма для активации кнопки
  const isFormValid = () => {
    return (
      name.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      validateEmail(email) &&
      password.length >= 6 &&
      password === confirmPassword
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    // Также проверяем совпадение паролей
    if (errors.confirmPassword && e.target.value === confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Имитация регистрации
    setTimeout(() => {
      if (email && password && name && password === confirmPassword) {
        onLogin();
        navigate("/");
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
              <h2>Регистрация</h2>
            </AuthTitle>
            <AuthForm onSubmit={handleSubmit}>
              <AuthFormGroup>
                <AuthInput
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={handleNameChange}
                  $hasError={!!errors.name}
                  required
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="email"
                  placeholder="Эл.почта"
                  value={email}
                  onChange={handleEmailChange}
                  $hasError={!!errors.email}
                  required
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={handlePasswordChange}
                  $hasError={!!errors.password}
                  required
                />
                {errors.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </AuthFormGroup>
              <AuthFormGroup>
                <AuthInput
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  $hasError={!!errors.confirmPassword}
                  required
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </AuthFormGroup>
              <AuthFormGroup2>
                <AuthButton
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </AuthButton>
                <AuthFormP>
                  Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                </AuthFormP>
              </AuthFormGroup2>
            </AuthForm>
          </AuthBlock>
        </AuthModal>
      </AuthContainer>
    </PageWrapper>
  );
}

export default RegisterPage;
