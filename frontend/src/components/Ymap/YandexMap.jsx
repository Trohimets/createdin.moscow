import { Map, Placemark, ZoomControl, Clusterer } from "@pbe/react-yandex-maps";
import icon from "../../assets/icons/marker.svg";
import "./yandexMap.sass";
// import { data } from "../../TEMP_DATA/DATA";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const YandexMap = ({ prop }) => {
  const [newData, setNewData] = useState([]);
  const mapState = {
    center: [55.751063, 37.616494],
    zoom: 12,
    behaviors: ["default"],
  };

  const data = useSelector((state) => state.cards.objects);
  const filteredData = useSelector((state) => state.filtered.filtered);
  useEffect(() => {
    if (data.length >= 1) {
      let dataMod = data.filter(el => el.building_status[0]?.stat == "Опубликовано")
      let array = (filteredData.length ? filteredData : dataMod).map((el) => ({
        ...el,
        coordinates: el.coordinates.split(",").map(Number),
        body: `<div class='container'>
        <div className="wrapper">
          <h2 class='bodyTitle'>${el.title}</h2>
          <p class="description">${el.desc}</p>
          <div class="contacts">
            <p class="adress">${el.address}</p>

          </div>
        </div>
        <a class="button" href='../space/${el.id}'>Открыть</a>
      </div>`,
      }));
      setNewData(array);
    }
  }, [data, filteredData]);
  return (
    <section className="section" ref={prop}>
     {newData &&  <Map
        instanceRef={(ref) => {
          ref && ref.behaviors.disable("scrollZoom");
        }}
        defaultState={mapState}
        width={"100%"}
        height={600}

      >
        {/* <Clusterer
          options={{
            groupByCoordinates: false,
            preset: "islands#redClusterIcons",
          }}
        > */}
          {newData.map((item) => (
            <Placemark
              defaultGeometry={item.coordinates}
              key={item.id}
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              options={{
                iconLayout: "default#imageWithContent",
                iconImageHref: icon,
                iconImageSize: [20, 60],
                iconImageOffset: [-20, -40],
                iconCaptionMaxWidth: 500,
              }}
              properties={{
                balloonContentBody: item.body,
                hintContent: item.name,
              }}
            />
          ))}
        {/* </Clusterer> */}
        <ZoomControl
          options={{
            float: "left",
            position: { right: 50, bottom: 250 },
            size: "small",
          }}
        />
      </Map>}
    </section>
  );
};
