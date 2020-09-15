//Library:
import AsyncStorage from '@react-native-community/async-storage';
import {btoa} from 'abab';

//Setup:
import {
  TYPE_USER,
  APP_ID,
  COMPANY_ID,
  DEVICE_ID,
  isIos,
} from '../constants/System';
import {Api} from '../api/Api';
import {KEY_ASYNC_STORE} from '../keys/KeyAsyncStore';

//Services:
import {AccountService} from '../services/AccountService';
import ServicesUpdateComponent from '../services/ServicesUpdateComponent';

let resetTokenStatus = false;
const CommonCall = async (api, header, needToken = null) => {
  console.log('api', api);
  try {
    const account = AccountService.getAccount();
    let headers;
    if (needToken || (needToken === null && account && account.accessToken)) {
      headers = {
        Accept: 'application/json',
        accessToken: `${account.accessToken}`,
        appId: `${APP_ID}`,
        deviceId: `${DEVICE_ID}`,
        typeOs: isIos ? 'IOS' : 'ANDROID',
        memberCode: account.memberCode,
      };
    }

    if (header.method === 'POST') {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
      };
    }

    let head = {...header, headers};
    const response = await fetch(api, {
      ...head,
      credentials: 'same-origin',
    });
    // console.log('%c Dữ liệu nguyên bản từ server:', 'color:red', response);
    if (response.status === 200) {
      const result = await response.json();
      // console.log('%c result', 'color:green', result);
      //Access token hết hạn:
      if (result.status === 900) {
        if (resetTokenStatus) {
          let newResponse = await new Promise((resolve, reject) => {
            setTimeout(async () => {
              resetTokenStatus = false;
              const newAccount = AccountService.getAccount();
              const responseReCallApi = await ReCallApiWhenGetAccessToken(
                head,
                api,
                newAccount.accessToken,
                headers,
              );
              resolve(responseReCallApi);
            }, 1000);
          });
          return newResponse;
        } else {
          resetTokenStatus = true;
          const resToken = await getAccessToken();
          if (resToken.success) {
            const responseReCallApi = await ReCallApiWhenGetAccessToken(
              head,
              api,
              resToken.accessToken,
              headers,
            );
            resetTokenStatus = false;
            return responseReCallApi;
          }
          if (resToken.code === 401) {
            const typeLogin = 'AUTO_LOGIN'; //Không được phép di chuyển biến này!(Chỉ dùng trong case này!)
            const account = AccountService.getAccount();
            const {phone, password} = account;
            const response = await FetchApi.login(phone, password, typeLogin);
            if (response && response.success && response.data.memberId) {
              response.data.password = password;
              AccountService.updateAccount(response.data);
              resetTokenStatus = false;
            } else {
              await AsyncStorage.removeItem(KEY_ASYNC_STORE.account);
              resetTokenStatus = false;
              setTimeout(() => {
                ServicesUpdateComponent.set('AUTO_LOGIN_ERROR');
              }, 5678);
            }
          }
        }
      }
      if (result.status.code === 1000) {
        return {
          success: true,
          data: result.data,
          code: result.status.code,
          status_code: response.status,
        };
      } else {
        return {
          success: false,
          data: result.data,
          code: result.status.code,
          message: result.status.message,
          status_code: response.status,
        };
      }
    }

    if (response.status >= 500) {
      return {
        code: null,
        message: 'Server is maintaining',
        success: false,
        status_code: response.status,
      };
    }
    return {
      code: null,
      success: false,
      message: 'Error code: ' + response,
      status_code: response.status,
    };
  } catch (error) {
    return {
      code: null,
      status_code: null,
      success: false,
      message: error.message,
    };
  }
};

//Gọi lại API lấy AccessToken:
const ReCallApiWhenGetAccessToken = async (
  head,
  api,
  newAccessToken,
  headers,
) => {
  const newHeaders = {
    ...headers,
    Authorization: `${newAccessToken}`,
  };
  const newHead = {...head, headers: newHeaders};
  const responseRefeshToken = await fetch(api, newHead);
  const resultRefeshToken = await responseRefeshToken.json();
  return {
    success: true,
    data: resultRefeshToken.data,
  };
};

//Danh sách API được gọi:
const FetchApi = {
  //Đăng kí deviceID:
  registrationDeviceId: () => {
    const header = {
      method: 'GET',
    };
    const api = Api.registrationDeviceID();
    return CommonCall(api, header, false);
  },

  //Lấy danh sách thông báo thường:
  getListNoti: (size, page) => {
    const header = {
      method: 'GET',
    };
    const api = Api.getListNotificationAll(size, page);
    return CommonCall(api, header);
  },
  login: (phone, password, typeLogin, birthday) => {
    let data = new FormData();
    data.append('email', phone);
    data.append('password', password);
    data.append('typeUser', TYPE_USER);
    data.append('deviceId', DEVICE_ID);
    data.append('typeLogin', typeLogin);
    data.append('birthday', birthday);
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('rabiloo:rabiloo'),
      },
      body: data,
    };
    const api = Api.login();
    return Login(api, header);
  },
  register: (
    email,
    password,
    gender,
    dateOfBirth,
    zipCode,
    pinCode,
    memberCode,
  ) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('gender', gender);
    data.append('birthday', dateOfBirth);
    data.append('zipCode', zipCode);
    data.append('pinCode', pinCode);
    data.append('memberCode', memberCode);
    data.append('companyId', COMPANY_ID);
    data.append('deviceId', DEVICE_ID);
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa('rabiloo:rabiloo'),
      },
      body: data,
    };
    const api = Api.register();
    return CommonCall(api, header, false);
  },
};

//Đăng nhập:
const Login = async (api, header) => {
  try {
    const response = await fetch(api, header);
    if (response.status === 200) {
      const result = await response.json();
      if (result.access_token !== '') {
        return {
          success: true,
          data: result,
        };
      }
      return {
        success: false,
        message: `Error code: ${response.status || undefined}`,
      };
    }
    let resultError = await response.json();
    return {
      success: false,
      code: resultError.error_code,
      message: `Error code: ${resultError.error_code}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

//Hết hạn Token:
const getAccessToken = async () => {
  try {
    const account = AccountService.getAccount();
    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        deviceId: DEVICE_ID,
      },
    };
    const api = Api.getAccessToken(account.refreshToken);
    const response = await fetch(api, header);
    const result = await response.json();
    if (response.status === 200) {
      if (result.status.code === 1000) {
        let newAccount = {...account};
        newAccount.accessToken = result.data;
        AccountService.setAccount(newAccount);
        return {
          success: true,
          accessToken: result.data,
        };
      }
      if (result.status.code === 401) {
        return {
          success: false,
          message: result.status.message,
          code: result.status.code,
          status_code: response.status,
        };
      }
    }
    if (response.status >= 500) {
      return {
        code: null,
        message: 'Server is maintaining',
        success: false,
        status_code: response.status,
      };
    }
  } catch (error) {
    return {
      code: null,
      status_code: null,
      success: false,
      message: error.message,
    };
  }
};

export {FetchApi};
