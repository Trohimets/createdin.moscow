import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const Redirect = ({children}) => {

  const logedIn = useSelector((state) => state.auth.loggedIn);
  if (logedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};