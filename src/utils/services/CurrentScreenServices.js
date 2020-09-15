const changeObject = {};
let currentScreen = '';
function broadcast() {
  Object.keys(changeObject).forEach(
    (k) => changeObject[k] && changeObject[k](),
  );
}
const CurrentScreenServices = {
  get: () => currentScreen,
  set: (event) => {
    currentScreen = event;
    broadcast();
  },
  onChange: (key, callBack) => {
    changeObject[key] = () => callBack(currentScreen);
  },
  remove: (key) => {
    delete changeObject[key];
  },
};
export default CurrentScreenServices;
