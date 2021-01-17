import React, {useState} from 'react';
import {getDustDay} from './dust.service';

const Clock = () => {
  const [hour, setHour] = useState<number | string>(0);
  const [min, setMin] = useState<number | string>(0);
  const [sec, setSec] = useState<number | string>(0);
  const [day, setDay] = useState('');
  const [dustDay, setDustDay] = useState('');
  const [isNight, setIsNight] = useState(false);

  // const setClock = () => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   let month: string | number = now.getMonth() + 1;
  //   let date: string | number = now.getDate();
  //   let day: string | number = now.getDay();
  //   let hour: string | number = now.getHours();
  //   let min: string | number = now.getMinutes();
  //   let sec: string | number = now.getSeconds();
  //
  //   hour = convertDouble(hour)
  //   min = convertDouble(min)
  //   sec = convertDouble(sec)
  //   date = convertDouble(date)
  //   month = convertDouble(month)
  //
  //   if (hour > 18) {
  //     setIsNight(true)
  //   }
  //
  //   setHour(hour);
  //   setMin(min);
  //   setSec(sec);
  //   setDay(year + '/' + month + '/' + date + '（' + JAPANESE_DAY[day] + '）');
  //   setDustDay(getDustDay(JAPANESE_DAY[day + 1]))
  // }

  // window.setInterval(() => {
  //   setClock()
  // }, 1000);



  return (
    <div className={isNight ? 'is-night clock-wrap' : 'clock-wrap'}>
      <div className={'grid-wrap'}>
        <div className={'day-cell'}>
          <div className="day">{day}</div>
        </div>
        <div className={'timer-cell'}>
          <div className='time'>
            <div>
              <span className={'time-hour'}>{hour}</span>
              <span>:</span>
              <span className={'time-min'}>{min}</span>
              <span>:</span>
              <span className={'time-sec'}>{sec}</span>
            </div>
          </div>
        </div>
        <div className="dust-cell">
          <div>
            <p>明日のゴミ</p>
            <span className='dust'>{dustDay === '' ? 'なし' : dustDay}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clock
