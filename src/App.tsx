import React, {useState} from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Clock/>
    </div>
  );
}

export default App;

const Clock = () => {
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [dustDay, setDustDay] = useState('');
  const JAPANESE_DAY = ['日', '月', '火', '水', '木', '金', '土'];

  const setClock = () => {
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

    setTime(hour + ':' + min + ':' + sec);
    setDay(year + '/' + month + '/' + date + '（' + JAPANESE_DAY[day] + '）');
    setDustDay(getDustDay(JAPANESE_DAY[day + 1]))
  }

  window.setTimeout(() => {
    setClock()
  }, 1000);

  const getDustDay = (day: string) => {
    let dust = '';
    switch (day) {
      case '月':
        dust = '燃えるごみ';
        break;
      case '火':
        break;
      case '水':
        dust = '古紙・ペット / 第2・4なら、不燃ごみ';
        break;
      case '木':
        dust = '燃えるごみ';
        break;
      case '金':
        break;
      case '土':
        dust = 'びん・かん・プラスチック';
        break;
      case '日':
        break;
    }
    return dust
  }

  const convertDouble = (value: string | number) => {
    if (value < 10) {
      return String(0 + value.toString())
    }
    return value
  }

  return (
    <div className='clock-wrap'>
      <div className='time'>{time}</div>
      <div className='day'>{day}
        {
          dustDay === '' ? null : (
            <span className='dust'>明日のゴミ：{dustDay}</span>
          )
        }
      </div>
    </div>

  )
}
