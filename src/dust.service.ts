export const getDustDay = (day: string) => {
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
      dust = 'びん・かん';
      break;
    case '日':
      break;
  }
  return dust
}

export const convertDouble = (value: string | number) => {
  if (value < 10) {
    return String(0 + value.toString())
  }
  return value
}

export const JAPANESE_DAY = ['日', '月', '火', '水', '木', '金', '土'];
