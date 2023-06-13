import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/@globals.sass";
import { BrowserRouter } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import store from "./store";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <BrowserRouter>
    <Helmet>
        <title>Креативные площадки Москвы</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <YMaps
        query={{
          apikey: "f546cab1-1f4a-4f9d-bf0f-22100e02ce30",
          lang: "ru_RU",
          load: "package.full",
        }}
      >
        <App />
      </YMaps>
    </BrowserRouter>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
