import React, { useState} from 'react';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;

const Clock = () => {
  const [time, setTime] = useState('');
  const [dustDay, setDustDay] = useState('');
  const setClock = () => {
    const myDay = new Array("日","月","火","水","木","金","土");
    const now  = new Date();
    const year = now.getFullYear(); // 年
    const month = now.getMonth()+1; // 月
    const date = now.getDate(); // 日
    const day = now.getDay();
    let hour = now.getHours(); // 時
    let min  = now.getMinutes(); // 分
    let sec  = now.getSeconds(); // 秒

    // 数値が1桁の場合、頭に0を付けて2桁で表示する指定
    if(hour < 10) { hour = 0 + hour; }
    if(min < 10) { min = 0 + min; }
    if(sec < 10) { sec = 0 + sec; }
    
    setTime(year + '/' + month + '/' + date + '（' + myDay[day] + '）'  + hour + ':' + min + ':' + sec);
    setDustDay(getDustDay(myDay[day]))
  }

  window.setTimeout(() => {
    setClock()
  }, 1000);

  const getDustDay = (day: string) => {
    let dust = '';
    switch(day) {
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

  return (
    <div className='clock-wrap'>
      <div className='clock'>{time}</div>
      {
        dustDay === '' ? (
          <p>明日は捨てられるものはないよ</p>
        ): (
          <p>明日のゴミ：{dustDay}</p>
        )
      }
    </div>

  )
}
