import React, { useState, useRef } from "react";
import Formgroup from "../../components/fromgroup/formgroup";
import * as Styled from "./home.styled";
import * as DATA from "../../DATA/data";
import mapboxgl from "mapbox-gl";

export interface Ifrom {
  carriers?: string | undefined;
  city?: string | undefined;
  code?: string | undefined;
  country?: string | undefined;
  direct_flights?: string | undefined;
  elev?: string | undefined;
  email?: string | undefined;
  icao?: string | undefined;
  lat?: string | undefined;
  lon?: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  runway_length: string | undefined;
  state: string | undefined;
  type: string | undefined;
  tz: string | undefined;
  url: string | undefined;
  woeid: string | undefined;
}

export interface ITo {
  carriers?: string | undefined;
  city?: string | undefined;
  code?: string | undefined;
  country?: string | undefined;
  direct_flights?: string | undefined;
  elev?: string | undefined;
  email?: string | undefined;
  icao?: string | undefined;
  lat?: string | undefined;
  lon?: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  runway_length: string | undefined;
  state: string | undefined;
  type: string | undefined;
  tz: string | undefined;
  url: string | undefined;
  woeid: string | undefined;
}

function Home() {
  const [from, setFrom] = useState<Ifrom | undefined>();
  const [to, setTo] = useState<ITo | undefined>();
  const [fromAirPort, setFromAirPort] = useState([]);
  const [toAirPort, setToAirPort] = useState([]);
  const [nautical, setnautical] = useState(Number);
  const latg1 = Number(from?.lat);
  const lon1 = Number(from?.lon);
  const latg2 = Number(to?.lat);
  const lon2 = Number(to?.lon);

  const mapContainer: any = useRef(null);
  const map: any = useRef(null);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGVla3NoYW1laHRhMTI1IiwiYSI6ImNrcWV6OWE0bDBjcmMydXF1enZqMjd5MDMifQ.hFB7SI_kojKYfNQ42c62BA";

  const geoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          LTYPE: "MFG",
        },
        geometry: {
          type: "Point",
          coordinates: [lon1, latg1],
        },
      },

      {
        type: "Feature",
        properties: {
          LTYPE: "MFG",
        },
        geometry: {
          type: "Point",
          coordinates: [lon2, latg2],
        },
      },

      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [lon1, latg1],
            [lon2, latg2],
            // [-70.063751, 41.256952],
            // [-161.841, 60.7836],
          ],
        },
      },
    ],
  };

//

  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer?.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-95.712891, 37.09024],
      zoom: 4,
      maxBounds: [
        [-171.791110603, 18.91619], // Southwest coordinates
        [-66.96466, 71.3577635769], // Northeast coordinates
      ],
    });
  });

  const addLayer = (map: any) => {
    map.current.addLayer({
      id: "route",
      type: "line",
      source: "mapDataSourceId",
      filter: ["==", "$type", "LineString"],
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "red",
        "line-width": {
          base: 1.5,
          stops: [
            [5, 5],
            [5, 5],
            [5, 5],
            [22, 8],
          ],
        },
      },
    });

    map.current.addLayer({
      id: "location",
      type: "circle",
      source: "mapDataSourceId",
      filter: ["==", "$type", "Point"],
      paint: {
        "circle-color": "red",
        "circle-radius": {
          base: 30,
          stops: [
            [1, 1],
            [6, 3],
            [10, 8],
            [22, 12],
          ],
        },
      },
    });
  };

  const handleFromSearch = (value: any) => {
    console.log("value", typeof value);
    setFrom(value);
    const resultData = DATA?.ListAirport.filter(
      (p) => p.country === "United States"
    );
    const AirportList = resultData.filter((p) => p.type === "Airports");
    const resultFrom: any = AirportList.filter((p) =>
      p.city.toLowerCase().includes(value)
    );
    setFromAirPort(resultFrom);
  };

  const handleToSearch = (value: any) => {
    setTo(value);
    const resultData = DATA?.ListAirport.filter(
      (p) => p.country === "United States"
    );
    const AirportList = resultData.filter((p) => p.type === "Airports");
    const resultFrom: any = AirportList.filter((p) =>
      p.city.toLowerCase().includes(value)
    );

    setToAirPort(resultFrom);
  };

  const onHandelSelect = () => {
    if (from && to) {
      var R = 6371; // km
      var dLat = toRad(latg2 - latg1);
      var dLon = toRad(lon2 - lon1);
      var lat1 = toRad(latg1);
      var lat2 = toRad(latg2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      var n = d * 0.5399568035;
      setnautical(n);
      map.current.addSource("mapDataSourceId", {
        type: "geojson",
        data: geoData,
      });
      addLayer(map);
      map.current.flyTo({
        center: [lon1, latg1],
      });
    } else {
      alert("Please Select All InputFiled");
    }
  };
  function toRad(Value: number) {
    return (Value * Math.PI) / 180;
  }
//
  return (
    <Styled.Container>
      <Styled.MainContainer>
        <Styled.HeaderName>Airport Distances</Styled.HeaderName>
      </Styled.MainContainer>
      <Styled.InputFieldMainContainer>
        <Styled.TextfieldContainer>
          <Styled.Div>
            <Formgroup
              labeltext="Distance From"
              typetext="search"
              placeholdertext="From"
              searchResult={fromAirPort}
              onSelected={handleFromSearch}
              onChange={handleFromSearch}
              value={from}
            />
          </Styled.Div>
          <Styled.Div>
            <Formgroup
              labeltext="Distance To"
              typetext="search"
              placeholdertext="To"
              searchResult={toAirPort}
              onSelected={handleToSearch}
              onChange={handleToSearch}
              value={to}
            />
          </Styled.Div>
        </Styled.TextfieldContainer>
      </Styled.InputFieldMainContainer>
      <Styled.MainContainer>
        <Styled.Button disabled={false} onClick={onHandelSelect}>
          Measure Distance
        </Styled.Button>
      </Styled.MainContainer>

      <Styled.MainContainer>
        <Styled.NauticalCal>
          Nautical : {Number(nautical).toFixed(2)} nmi{" "}
        </Styled.NauticalCal>
      </Styled.MainContainer>
      <div ref={mapContainer} style={{ height: "500px" }} />
    </Styled.Container>
  );
}

export default Home;
