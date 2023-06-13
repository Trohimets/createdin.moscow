import { HomePage } from '../../pages/Home/Home';
import styles from './styles.module.sass';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../../pages/Auth/Auth';
import { Protected } from '../../components/Protected/Protected';
import { NotFoundPage } from '../../pages/NotFound/NotFound';
import { AgreementPage } from '../../pages/Agreement/Agreement';
import { SpacePage } from '../../pages/Space/Space';
import { PersonalAreaPage } from '../../pages/Personal/PersonalArea';
import { NewObjectPage } from '../../pages/NewObject/NewObject';
import { Redirect } from '../../components/Protected/Redirect';
import { useSelector } from 'react-redux';
import { Modal } from '../../components/Modal/Modal';

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { apiAuth } from "../../utils/api/apiAuth";
import { setUserData } from "../../store/userSlice";
import { setLoggedIn, setToken } from "../../store/authSlice";
import { OfertaPage } from "../../pages/Oferta/Oferta";
import { apiProfiles } from '../../utils/api/profileApi';
import { setProfile } from '../../store/userSlice';

export const Main = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const dispatch = useDispatch();
  let isLoggedIn = localStorage.getItem('logIn') && true;

  // Запрос данных профиля
  const getProfile = (id, role) => {
    console.log(id, role);
    switch (role) {
      case 'RENTER':
        apiProfiles
          .getProfileDataRenter(id)
          .then((res) => {
            dispatch(setProfile(res[0]));
          })
          .catch((err) => console.log(err));
        break;
      case 'LANDLORD':
        apiProfiles
          .getProfileDataLandlord(id)
          .then((res) => dispatch(setProfile(res[0])))
          .catch((err) => console.log(err));
        break;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isLoggedIn) {
      console.log('test', token);
      dispatch(setLoggedIn(true));
      dispatch(setToken(token));
      apiAuth
        .getUserData(token)
        .then((res) => {
          console.log(res, 'user DATA');
          dispatch(setUserData(res));
          getProfile(res.id, res.role);
          localStorage.setItem('role', res.role);
          localStorage.setItem('id', res.id);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <main className={styles.main}>
      <div className={styles.main__wrapper}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            exact
            path="/auth"
            element={
              <Redirect>
                <AuthPage />
              </Redirect>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
          <Route exact path="/agreement" element={<AgreementPage />} />
          <Route exact path="/space/:id" element={<SpacePage />} />

          <Route
            exact
            path="lk/*"
            element={
              <Protected>
                {' '}
                <PersonalAreaPage />{' '}
              </Protected>
            }
          />
          <Route
            exact
            path="new"
            element={
              <Protected>
                <NewObjectPage lable="Добавить новый объект" />
              </Protected>
            }
          />
          <Route
            exact
            path="edit/:id"
            element={
              <Protected>
                <NewObjectPage lable="Внести изменения" edit={true} />
              </Protected>
            }
          />
          <Route exact path="oferta/:id"
          element={
            <OfertaPage />
           } />
        </Routes>
        <Modal />
      </div>
    </main>
  );
};
