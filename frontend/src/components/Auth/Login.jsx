import styles from "./styles.module.sass";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import { apiAuth } from "../../utils/api/apiAuth";
import { setToken, setLoggedIn } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/userSlice";
import { emailRegExp } from '../../utils/regExp';

export const Login = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const authData = {
      email: data.email,
      password: data.password,
    };
    apiAuth
      .login(authData)
      .then((res) => {
        console.log(res);
        dispatch(setToken(res.auth_token));
        dispatch(setLoggedIn(true));
        localStorage.setItem("logIn", true);
        localStorage.setItem("token", res.auth_token);
        apiAuth.getUserData(res.auth_token).then((res) => {
          dispatch(setUserData(res));
          localStorage.setItem("role", res.role);
        });
      })
      .catch((err) => console.log(err));
   
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <section className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Авторизация</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.lable}>
            Электронная почта
          </label>
          <input
            {...register("email", {
              required: "Обязательное поле",
              minLength: {
                value: 2,
                message: 'Минимум два символа',
              },
              pattern: {
                value: emailRegExp,
                message: 'Некорректный email',
              },

            })}
            className={styles.input}
            name="email"
            id="email"
            type="text"
            placeholder="email"
            autoComplete="off"
          />
          {errors.email && (
            <p role="alert" className={styles.inputError}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.lable}>
            Пароль
          </label>

          <input
            {...register("password", {
              required: "Обязательное поле",
            })}
            className={styles.input}
            name="password"
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Введите пароль"
            autoComplete="off"
          />
          <button className={styles.showPass} type="button" onClick={handleShowPass} />
          {errors.password && (
            <p role="alert" className={styles.inputError}>
              {errors.password.message}
            </p>
          )}
        </div>

        <ButtonDefault lable="Авторизоваться" />
      </form>
    </section>
  );
};
