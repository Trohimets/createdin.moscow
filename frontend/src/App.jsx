import { useEffect } from "react";
import { Header } from "./layout/Header/Header";
import { Main } from "./layout/Main/Main";
import { useDispatch } from "react-redux";
import { setObjects, setComments, setBooking } from "./store/dataSlice";
import { setAllUsers } from "./store/userSlice";
import { apiObjects } from "./utils/api/objectsApi";
import { apiComments } from "./utils/api/commentsApi";
import { Footer } from "./layout/Footer/Footer";
import { Preloader } from "./components/Preloader/Preloader";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    apiObjects
      .getObjectsList()
      .then((res) => {
        console.log(res, "объекты");
        let array = res.filter(
          (el) => el.building_status[0]?.stat == "Опубликовано"
        );
        dispatch(setObjects(res));
      })
      .catch((err) => console.log(err));
    apiComments
      .getCommentsList()
      .then((res) => {
        console.log(res, "комментарии");
        dispatch(setComments(res));
      })
      .catch((err) => console.log(err));
    apiObjects
      .getAllUsers()
      .then((res) => {
        console.log(res, "пользователи");
        dispatch(setAllUsers(res));
      })
      .catch((err) => console.log(err));

    apiObjects
      .getBookingList()
      .then((res) => {
        console.log(res, "Букинг");
        dispatch(setBooking(res));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
