import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import {ja} from 'date-fns/locale';
import {getDustDay} from './dust.service';
import {fetchWeather} from './weatcher.service';
import {Weather} from './weatherAPIResponse';

const ClockV2 = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [dust, setDust] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isNight, setIsNight] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetchWeather().then(res => {
      const {current} = res;
      setTemperature(current.temp);
      setHumidity(current.humidity);
      setPressure(current.pressure);
      setWeather(current.weather[0]);
      setIsLoading(false);
    })
  }, []);

  // 4hおきに画面をリロードする
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 14400000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    if (now) {
      const dayOfWeek = format(now, 'eee', {locale: ja});
      setDust(getDustDay(dayOfWeek));
      checkNightTheme(now.getHours())
    }
  }, [now]);

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

  return (
    !isLoading ?
      <Wrap isNight={isNight}>
        {now !== null &&
        <Timer
          now={now}
          dust={dust ? dust : '燃えるゴミ'}
        />
        }
        <StyledSubInfo>
          <p>気温：{temperature}℃ 湿度：{humidity}% 気圧: {pressure}</p>
          {weather &&
          <StyledIcon>
            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt=""/>
            <p>{weather.description}</p>
          </StyledIcon>}
        </StyledSubInfo>
      </Wrap> :
      null
  );
};

export default ClockV2;

interface ITimer {
  now: Date;
  dust: string
}

const Timer = memo<ITimer>(props => {
  const {now, dust} = props;
  const year = format(now, 'yyyy');
  const month = format(now, 'MM');
  const day = format(now, 'dd');
  const dayOfWeek = format(now, 'eee', {locale: ja});
  const hour = format(now, 'kk');
  const min = format(now, 'mm');
  const sec = format(now, 'ss');

  return (
    <StyledTimer>
      <StyledTime>{hour}:{min}:{sec}</StyledTime>
      <StyledDate>{year} / {month} / {day} ({dayOfWeek})<Spacer/>{dust}</StyledDate>
    </StyledTimer>
  )
});

const StyledTimer = styled.div`
  text-align: center;
  position: relative;
  height: 100%;
  width: 100%;
`;

const StyledDate = styled.p`
  font-size: 3.5rem;
  line-height: 1;
  text-align: right;
  position: absolute;
  right: 80px;
  bottom: 280px;
`;

const StyledTime = styled.p`
  line-height: 1;
  letter-spacing: 0.05em;
  font-size: 13rem;
  padding: 5px 0;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;

const Wrap = styled.div<{ isNight: boolean }>`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${(props) => (props.isNight && '#333')};
  color: ${(props) => (props.isNight && '#FFF')};
`;

const StyledSubInfo = styled.div`
  display: flex;
  padding: 0 2rem;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;

  position: absolute;
  right: 60px;
  bottom: 120px;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Spacer = styled.span`
  line-height: 1;
  margin: 0;
  padding: 0;
  width: 2rem;
  height: 1rem;
  display: inline-block;
`;
