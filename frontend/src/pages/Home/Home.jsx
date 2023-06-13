import { Filters } from "../../components/Filters/Filters";
import { Hero } from "../../components/Hero/Hero";
import { YandexMap } from "../../components/Ymap/YandexMap";
import { CardsList } from "../../components/Cards/CardsList";
import { useRef } from "react";
import { ToTop } from "../../components/ToTop/ToTop";

export const HomePage = () => {
  const myRef = useRef(null);

  return (
    <>
      <Hero prop={myRef} />
      <Filters />
      <YandexMap prop={myRef} />
      <CardsList />
      <ToTop />
    </>
  );
};
