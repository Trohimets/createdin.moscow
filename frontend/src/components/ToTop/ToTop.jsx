import { useState } from "react";
import styles from "./ToTop.module.sass";

export const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Get the button:
  let mybutton = document.getElementById("btnToTop");

  // When the user scrolls down 500px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 1550 ||
      document.documentElement.scrollTop > 1550
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <button
      className={isVisible ? styles.btn : styles.btnHidden}
      id="btnToTop"
      onClick={topFunction}
    />
  );
};
