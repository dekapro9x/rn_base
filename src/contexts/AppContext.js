import React, {useRef, createContext} from 'react';
import {COLOR} from '../utils';
const ContextContainer = createContext();

const AppContext = (props) => {
  //Khởi tạo dữ liệu ban đầu cho toàn bộ cấu hình App 1:
  const appDataSetup = useRef({
    logoApp: '',
    policy: '',
    colorApp: {
      //Màu nền của toàn bộ các màn hình APP:
      backgroundColor: COLOR.white,
      //Màu chữ mặc định toàn bộ APP:
      textColor: COLOR.black,

      //Nút bấm active:
      textColorButton: COLOR.white,
      borderColorButton: COLOR.main,
      backgroundColorButton: COLOR.main_color,

      //Nút bấm disable:
      textColorOutlineButton: COLOR.main_color,
      borderColorOutlineButton: COLOR.main_color,
      backgroundColorOutlineButton: COLOR.white,

      //Tabbar Active:
      activedTextTab: COLOR.white,
      activedBorderTab: COLOR.red,
      activeTabBackground: COLOR.red,

      //TabBar Disable:
      inactivedTextTab: COLOR.red,
      inactivedBorderTab: COLOR.red,
      inactiveTabBackground: COLOR.white,
    },
    homeBottomMenu: [],
    homeSubMenu: [],
    homeParentMenu: [],
    homeDrawerMenu: [],
    homeBanner: [],
    appIntroImage: [],
    alwaysDisplayIntroducingImage: null,
    footerNewMemeber: '',
  });

  return (
    <ContextContainer.Provider value={{...appDataSetup}}>
      {props.children}
    </ContextContainer.Provider>
  );
};

export {AppContext, ContextContainer};
