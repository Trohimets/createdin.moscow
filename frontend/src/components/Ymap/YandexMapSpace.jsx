import { Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import icon from "../../assets/icons/marker.svg";
import "./yandexMap.sass";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

// import { data } from "../../TEMP_DATA/DATA";
import { useEffect, useState } from "react";

export const YandexMapSpace = ({ data = [] }) => {
  const mapState = {
    center: data,
    zoom: 15,
    behaviors: ["default", "scrollZoom"],
  };

  const [heightMap, setHeightMap] = useState(400);

  const isMobile = useMediaQuery("max-width: 450px");

  useEffect(() => {
    if (isMobile) {
      setHeightMap(300);
    } else {
      setHeightMap(400);
    }
  }, [isMobile]);

  return (
    <section className="section">
      <Map
        defaultState={mapState}
        width={500}
        height={heightMap}
        options={{
          balloonPanelMaxMapArea: 0,
        }}
        instanceRef={(ref) => {
          ref && ref.behaviors.disable("scrollZoom");
        }}
      >
        {data && (
          <Placemark
            defaultGeometry={data}
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            options={{
              iconLayout: "default#imageWithContent",
              iconImageHref: icon,
              iconImageSize: [20, 60],
              iconImageOffset: [-20, -40],
              iconCaptionMaxWidth: 500,
            }}
          />
        )}
      </Map>
    </section>
  );
};
