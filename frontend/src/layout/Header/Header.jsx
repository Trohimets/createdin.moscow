import styles from "./styles.module.sass";
import logo from "../../assets/images/headerLogo.svg";
import { ButtonDefault } from "../../components/ButtonDefault/ButtonDefault";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiAuth } from "../../utils/api/apiAuth";
import { setLoggedOut, deleteToken } from "../../store/authSlice";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import loginIcon from "../../assets/icons/login.svg";
import loginOutIcon from "../../assets/icons/logout.svg";
import userIcon from "../../assets/icons/user.svg";

export const Header = () => {
  const navigate = useNavigate();
  const logedIn = useSelector((state) => state.auth.loggedIn);
  const [title, setTitle] = useState("Креативные площадки Москвы");
  const isMobile = useMediaQuery("(max-width: 773px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLoggedOut(true));
    dispatch(deleteToken(token));
    localStorage.clear();
    navigate("/");
    apiAuth.logout(token);
  };

  const location = useLocation();

  useEffect(() => {
    isTablet ? setTitle("КПМ") : setTitle("Креативные площадки Москвы");
  }, [isTablet]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img src={logo} className={styles.logo} />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title} onClick={() => navigate("/")}>
            {title}
          </h1>
          <div className={styles.circle} />
        </div>

        {logedIn ? (
          <div className={styles.btnWrapper}>
            {location.pathname !== "/lk" &&
              location.pathname !== "/lk/profile" &&
              location.pathname !== "/lk/requests" && (
                <ButtonDefault
                  lable="Личный кабинет"
                  action={() => navigate("/lk")}
                  isMobile={isMobile}
                  img={userIcon}
                  width={isMobile ? "25px" : ""}
                />
              )}

            <ButtonDefault
              lable="Выйти"
              isMobile={isMobile}
              img={loginOutIcon}
              action={() => handleLogout()}
              width={isMobile ? "25px" : ""}
            />
          </div>
        ) : (
          <ButtonDefault
            lable="Войти"
            action={() => navigate("/auth")}
            isMobile={isMobile}
            img={loginIcon}
            width={isMobile ? "25px" : ""}
          />
        )}
      </div>
    </header>
  );
};
