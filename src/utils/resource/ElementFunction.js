const getCurrentTime = () => {
  return moment().toDate().getTime();
};

export {getCurrentTime};
