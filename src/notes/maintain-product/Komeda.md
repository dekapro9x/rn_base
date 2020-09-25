# =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA =>>>>>>>> KOMEDA

# Chú ý:

Nếu đẩy code push thì check lại version trên Server, chỉ đẩy phần sửa đổi JS.
Sau đó chạy lệnh đẩy code push.
Còn sửa native cập nhật APK lên Apstore thì nhớ tăng version lên 1.
Đẩy IOS lên testFlight, cập nhật thông tin bản vá.
Sau đó chạy lệnh code push.

# Các bước cấu hình Komeda Product Android: (1.0.2)

# Android:

# 1: VersionApp đổi chiếu update ( đối chiếu với server) trong System.js:

System.js : const versionApp = isIos ? ‘1.0.2’ : ‘1.0.2’

// Product
const APP_ID = '1596690646035';
const URL_DOMAIN = 'https://komeda.shop-analyze.com';
const COMPANY_ID = '1596690640174';

# 2: Đổi tên App và key code push trong : AndroidManifest.xml

<string name="app_name">コメダ珈琲店</string>
<string moduleConfig="true" name="CodePushDeploymentKey">iBoxuzg_JLWCZn0HxbAybL2MZ4hviHfac0V18</string>

# 3: Đổi google-services và kiểm tra cấu hình của endpoint:

"project_number": "1038889905436",
"firebase_url": "https://komeda-57a7f.firebaseio.com",
"project_id": "komeda-57a7f",
"storage_bucket": "komeda-57a7f.appspot.com"

# 4: Kiểm tra SDK và Push (CHANNEL ID) trong AndroidManifest.xml:

  <meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_name" android:value="YOUR NOTIFICATION CHANNEL NAME"/>
    <meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_description" android:value="YOUR NOTIFICATION CHANNEL DESCRIPTION"/>
    <!-- sdk -->
    <meta-data android:name="ads_app_id" android:value="KOMEDA_01"/>
    <meta-data android:name="ads_app_key" android:value=""/>
    <meta-data android:name="ads_app_name" android:value="コメダ公式アプリ"/>
    <meta-data android:name="ads_company_id" android:value="INC_KOMEDA"/>
    <!-- sdk -->

# 5: Thay đổi versionCode và versionName trong app/build.gradle:

versionCode 3
versionName "1.0.2"

# 6: Xóa cache và build lại app:

cd android && ./gradlew clean : Xóa cache build.
npm start -- --reset-cache : Xóa cache.

# 7: Chạy kĩ lại máy thật 1 lần cuối.

# 8:Test Push noti Key pushtry Pro:

AAAA8eKp7Rw:APA91bE42Z-tpkwVhjC78z1Xb-v1LmtiflLGeixnuHT6q-o7XnrPlWSZbwFT3I50rnuOyukgZxSLF7JPUBMbP1hfEuTE7DMDSCqL6dvhP6UoATwpJqPgoF_B_3HPLQo5lwXqmR7UP1Kw

# 9: Vào android chạy: ./gradlew assembleRelease

# 10: Đẩy lệnh code push android: appcenter codepush release-react -a Komeda-Co./Komeda-Android -d Production -m

# =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS

# IOS: (1.0.2)

# 1: VersionApp đổi chiếu update ( đối chiếu với server) trong System.js:

const versionApp = isIos ? ‘1.0.2’ : ‘1.0.2’
// Product
const APP_ID = '1596690646035';
const URL_DOMAIN = 'https://komeda.shop-analyze.com';
const COMPANY_ID = '1596690640174';

# 2: Cấu hình Xcode:

bundle : jp.co.app.ios.komeda.public
Tên App : コメダ珈琲店
Tăng version App lên 1.0.2 Và reset bản build về 1.

# 3: Đổi key Code push trong info.split :

<key>CodePushDeploymentKey</key>
<string>GSTH5g4a5eVAO0Ghjz2HAoS5TVj7RjwIWKdI5</string>

# 4 : Cấu hình SDK : (Phần này Dev cấu hình sẵn rồi chỉ kiểm tra lại ).

# => Giải nén pro, coppy file libsdk-advertise.a trong react-native-shop-sdk/ios ném vào thư mục ios/komeda_app.

# => Mở XCode lên link SDK bằng tay => Add File To komeda_app => react-native-shop-sdk/ios/libsdk-advertise.a

# => Kiểm tra cấu hình trong react-native-shop-sdk/weblink:

const onClickApi = (notificationId, memberCode, deviceId) => {
if (memberCode !== undefined || memberCode !== null) {
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&memberCode=${memberCode}&deviceId=${deviceId}`;
}
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&deviceId=${deviceId}`;
};

# 5: Kiểm tra lại certificate , quyền build và đẩy App . ( Cái này App Pro cần quyền IOS certificate distribution)

# 6: Chạy lệnh code push IOS : appcenter codepush release-react -a Komeda-Co./Komeda-iOS -d Production -m

Tài khoản check Pro:  
vonh1995.it1@gmail.com
Anhvo1102
