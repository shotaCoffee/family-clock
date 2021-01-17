import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import './App.css';
import {convertDouble, getDustDay, JAPANESE_DAY} from './dust.service';
import {Weather, WeatherAPIResponse} from './weatherAPIResponse';
import 'es6-promise/auto';
import 'fetch-polyfill';
import {useLocalStorage} from './hooks/useLocalStorage';

const REQUEST_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=35.678569&lon=139.635952&&units=metric&lang=ja
&exclude=minutely,hourly,daily,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`

const STORAGE_KEY = 'storageHour'

const App = () => {
  const [weather, setWeather] = useState<Weather[]>();
  const [current, setCurrent] = useState<WeatherAPIResponse>()
  const [loading, setLoading] = useState(true);
  const [isNight, setIsNight] = useState(true);
  const [hour, setHour] = useState<number | string>(0);
  const [min, setMin] = useState<number | string>(0);
  const [sec, setSec] = useState<number | string>(0);
  const [day, setDay] = useState('');
  const [dustDay, setDustDay] = useState('');
  const {setStorage, getStorage} = useLocalStorage();

  const fetchWeather = async () => {
    const res = await fetch(REQUEST_URL);
    if (res.ok) {
      return await res.json()
    } else {
      console.log(res.status)
    }
  }

  const load = useCallback(() => {
    setLoading(true);
    fetchWeather()
      .then(value => {
        // console.log('value', value);
        const response = value as WeatherAPIResponse;
        setCurrent(response);
        setWeather(response.current.weather);
      })
      .then(() => {
        setLoading(false)
      })
  },[])

  useEffect(() => {
    load()
  }, [load]);

  const setClock = useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month: string | number = now.getMonth() + 1;
    let date: string | number = now.getDate();
    let day: string | number = now.getDay();
    let hour: string | number = now.getHours();
    let min: string | number = now.getMinutes();
    let sec: string | number = now.getSeconds();

    hour = convertDouble(hour)
    min = convertDouble(min)
    sec = convertDouble(sec)
    date = convertDouble(date)
    month = convertDouble(month)

    setHour(hour);
    setMin(min);
    setSec(sec);
    setDay(year + '/' + month + '/' + date + '（' + JAPANESE_DAY[day] + '）');
    setDustDay(getDustDay(JAPANESE_DAY[day + 1]));
    checkNightTheme(hour);
    setStorage(STORAGE_KEY, hour);

  }, [setStorage])

  const checkNightTheme = (hour: string | number) => {
    // 18時からナイトテーマ 7時からはライトテーマ
    if (0 <= hour && hour <= 5) {
      setIsNight(true);
    }
    if (6 <= hour && hour <= 18) {
      setIsNight(false)
    }
    if (19 <= hour && hour <= 24) {
      setIsNight(true)
    }
  }

  const checkWeather = useCallback(() => {
    const storageHour = getStorage(STORAGE_KEY);
    const currentHour = hour.toString();
    if ((Number(currentHour) - Number(storageHour)) > 3) {
      load()
    }
  }, [getStorage, hour, load])

  useEffect(() => {
    setInterval(() => {
      setClock();
      checkWeather();
    }, 1000);
  }, [checkWeather, setClock]);

  return (
    <Container isNight={isNight}>
      <TimeContainer>
        <Time>
          <TimeSpan>{hour}</TimeSpan>
          <span>:</span>
          <TimeSpan>{min}</TimeSpan>
          <span>:</span>
          <TimeSpan>{sec}</TimeSpan>
        </Time>
      </TimeContainer>
      {
        !loading &&
        <ItemContainer>
          <Day>
            <p>{day}<span>{dustDay}</span></p>
            {
              weather && current &&
              <WeatherDiv>
                <div>
                  <p>気温：{current.current.temp}℃</p>
                  <p>湿度：{current.current.humidity}%</p>
                  <p>気圧：{current.current.pressure}</p>
                </div>
                <div>
                  <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt=""/>
                  <p>{weather[0].description}</p>
                </div>
              </WeatherDiv>
            }
          </Day>
        </ItemContainer>
      }
    </Container>
  );
}

export default App;

const Container = styled.div<{ isNight: boolean }>`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${(props) => (props.isNight && '#333')};
  color: ${(props) => (props.isNight && '#FFF')};
`;

const TimeContainer = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 6rem;
`;
const ItemContainer = styled.div`
  display: flex;
  padding: 0 2rem;
  align-items: flex-start;
  justify-content: flex-end;
`;
const Time = styled.div`
  font-size: 15rem;
  height: 17.6875rem;
  letter-spacing: 1px;
  position: relative;
`;
const TimeSpan = styled.span`
  width: 18rem
`;

const Day = styled.div`
  font-size: 3rem;
  line-height: 1.2;
  display: flex;
  flex-direction: column;

  > p {
    > span {
      margin-left: 1rem;
    }
  }

  > div {
    font-size: 1.5rem;
    line-height: 1;
    margin-top: -2rem;
  }
`;

const WeatherDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div {
    display: flex;
    font-size: 2rem;
    margin-top: 1rem;

    > p {
      & + p {
        margin-left: 1rem;
      }
    }

    & + div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 1rem;

      > p {
        text-align: center;
        font-size: 1.2rem;
        margin-top: -1rem;
      }

      > img {
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
    }
  }
`;
