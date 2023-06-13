import styles from "./styles.module.sass";

const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import { apiAuth } from "../../utils/api/apiAuth";
import { useDispatch } from "react-redux";
import { setToken, setLoggedIn } from "../../store/authSlice";
import { openModal } from "../../store/modalSlice";
import { userRegisterError, userRegisterSuccess } from "../../utils/modalPayload";

export const Register = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // const [register] = useRegisterMutation()
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  // console.log(useRegisterMutation())
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    const authData = {
      email: data.email,
      password: data.password,
      role: role,
    };
    e.preventDefault();
    apiAuth
      .register(authData)
      .then((res) => {
        dispatch(openModal(userRegisterSuccess))
      })
      .then(() => {
        login(authData);
      })
      .catch((err) => dispatch(openModal(userRegisterError)));
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const login = (data) => {
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
      })
      .catch((err) => console.log(err));
  };

  const [role, setRole] = useState("RENTER");

  return (
    <section className={styles.auth}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Регистрация</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.lable}>
            Электронная почта
          </label>
          <input
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: regex,
                message: "Введите корректный почтовый адрес",
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
              minLength: {
                value: 8,
                message: "Не менее 8 символов",
              },
            })}
            className={styles.input}
            name="password"
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Придумайте пароль"
            autoComplete="off"
          />
          <button className={styles.showPass} type="button" onClick={handleShowPass} />
          {errors.password && (
            <p role="alert" className={styles.inputError}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.lable}>
            Подтвердите пароль
          </label>

          <input
            {...register("passwordCheck", {
              required: "Обязательное поле",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Введенный пароль не совпадает";
                }
              },
            })}
            className={styles.input}
            // name="passwordCheck"
            id="passwordCheck"
            type={showPass ? "text" : "password"}
            placeholder="Повторите пароль"
            autoComplete="off"
          />
          <button className={styles.showPass} type="button" onClick={handleShowPass} />
          {errors.passwordCheck && (
            <p role="alert" className={styles.inputError}>
              {errors.passwordCheck.message}
            </p>
          )}
        </div>
        <div className={styles.inputGroupRadio}>
          <label className={styles.lable}>Вы регистрируетесь как...</label>

          <div className={styles.buttons}>
            <button 
              className={role == "RENTER" ? styles.buttonActive : styles.button}
              onClick={(e) => {e.preventDefault();setRole("RENTER")}}
            >
              Арендатор
            </button>

            <button 
              className={
                role == "LANDLORD" ? styles.buttonActive : styles.button
              }
              onClick={(e) => {e.preventDefault();setRole("LANDLORD")}}
            >
              Арендодатель
            </button>
          </div>
        </div>

        <ButtonDefault type="submit" lable="Зарегистрироваться" />
        
        <Link to="/agreement" className={styles.link}>
          Регистрируясь вы принимаете условия пользовательского соглашения
        </Link>
      </form>
    </section>
  );
};
