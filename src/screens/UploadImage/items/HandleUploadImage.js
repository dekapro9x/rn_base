import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PARAM = {
  camera: 'CAMERA',
  library: 'LIBRARY',
};

export default function uploadImagePicker(param) {
  const options = {};

  if (param == PARAM.library) {
    return new Promise((res, rej) => {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          res(null);
        } else if (response.error) {
          res(null);
        } else if (response.customButton) {
          res(null);
        } else {
          const {uri, path, fileName, type} = response;
          res({uri, path, fileName, type});
        }
      });
    });
  }
  if (param == PARAM.camera) {
    return new Promise((res, rej) => {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          res(null);
        } else if (response.error) {
          res(null);
        } else if (response.customButton) {
          res(null);
        } else {
          const {uri, path, fileName, type} = response;
          res({uri, path, fileName, type});
        }
      });
    });
  }
}
