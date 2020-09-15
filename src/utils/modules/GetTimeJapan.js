import moment from 'moment';
const getTimeFomartDDMMYY = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const convertTimeMinuteSecondJaPanNoText = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  let minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let hour = date.getHours();
  return `${hour}:${minute}`;
};

const convertTimeHourMinuteSecondToJaPanTime = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  let seconds = date.getSeconds();
  let minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let hour = date.getHours();
  return `${hour}時${minute}分${seconds}秒`;
};

const convertTimeJaPanCreateTime = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  let month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  return `${year}年${month}月${day}日`;
};

const convertTimeJaPanCreateTimeNoText = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  let month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

const getDayJaPan = (time) => {
  let timeGet = getTimeFomartDDMMYY(time);
  let num = new Date(timeGet);
  let sum = num.getDay();
  let yead = num.getFullYear();
  if (yead < 9990) {
    if (sum == 0) {
      return '(日)';
    }
    if (sum == 1) {
      return '(月)';
    }
    if (sum == 2) {
      return '(火)';
    }
    if (sum == 3) {
      return '(水)';
    }
    if (sum == 4) {
      return '(木)';
    }
    if (sum == 5) {
      return '(金)';
    }
    if (sum == 6) {
      return '(土)';
    }
  }
  return null;
};

const convertTimeJaPanEndTime = (time) => {
  if (!time) {
    return '';
  }
  const date = new Date(time);
  let month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
  let year = date.getFullYear();
  if (year >= 2100) {
    return '無期限';
  } else {
    return `${date.getFullYear()}年${month}月${day}日`;
  }
};

const getTimeNow = () => {
  return moment().toDate().getTime();
};

const GetTimeJapan = {
  convertTimeJaPanCreateTime,
  convertTimeMinuteSecondJaPanNoText,
  getDayJaPan,
  convertTimeJaPanEndTime,
  timeNow: getTimeNow,
  convertTimeJaPanCreateTimeNoText: convertTimeJaPanCreateTimeNoText,
  convertTimeHourMinuteSecondToJaPanTime,
};

export {GetTimeJapan};
