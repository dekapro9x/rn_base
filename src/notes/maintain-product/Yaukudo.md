# =>>>>>>>> YAUKUDO =>>>>>>>> YAUKUDO =>>>>>>>> YAUKUDO =>>>>>>>> YAUKUDO =>>>>>>>> YAUKUDO

# Các bước cấu hình Yone Product Yaukudo Android: (Bản 2.3.3)

# Android:

# 1: Chuyển applicationIdSuffix trong build.gradle : (Cấu hình tạo file mới APK không ghi đè package)

buildTypes {
debug {
….
applicationIdSuffix ".public"
// applicationIdSuffix ".dev"
….
}
release {
….
applicationIdSuffix ".public"
// applicationIdSuffix ".dev"
….
}
}

# 2:Cấu hình System.js ( Kiểm tra version và enpoint production ):

export const versionApp = isIOS ? '2.3.3' : '2.3.3';

//Product:
export const URL_DOMAIN = 'https://yakuodo.shop-analyze.com';
export const URL = `${URL_DOMAIN}/api/v1/app/${APP_ID}/`;
export const SENDER_ID = '940581285110';
export const APPID = 'YAKU_001';
export const APPNAME = '薬王堂公式デモ';
export const COMPANYID = 'INC_YAKU';

# 3: Đổi tên App và key code push trong AndroidManifest.xml:

<string name="app_name">薬王堂公式アプリ</string>

# 4:Giải nén google-services product và kiểm tra cấu hình của endpoint google-services:

"project_number": "940581285110",
"firebase_url": "https://yakuodo-5256c.firebaseio.com",
"project_id": "yakuodo-5256c",
"storage_bucket": "yakuodo-5256c.appspot.com"

# 6: Giải nén và kiểm tra SDK và Push (CHANNEL ID) trong AndroidManifest.xml dòng 29:

 <meta-data android:name="ads_app_id" android:value="YAKUO1"/>
  <!-- <meta-data android:name="ads_app_id" android:value="YAKUO_DEV"/> -->
<meta-data android:name="ads_app_key" android:value="APPKEY_DEMO_ANDROID"/>
        <meta-data android:name="ads_app_name" android:value="薬王堂公式アプリ"/>
        <meta-data android:name="ads_company_id" android:value="INC_YAKUODO"/>

# =>Giải nén pro, coppy file libsdk-advertise.a trong react-native-shop-sdk/ios ném vào thư mục ios/KusuriAoKi.

# => Mở XCode lên link SDK bằng tay.

# 7:Kiểm tra cấu hình deepLink: trong AndroidManifest.xml dòng 68:

<!-- deeplink -->
 <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                 <!-- <data android:scheme="https" android:host="yakuodo.shop-analyze.com" /> -->
                 <data android:scheme="https" android:host="dev.yakuodo.shop-analyze.com" />
 </intent-filter>

# 7: Thay đổi versionCode và versionName trong app/build.gradle:

versionCode 60
versionName "2.3.3"

# 8: Giaỉ nén KeyStore product ra:

# 9: Xóa cache và build lại app:

cd android && ./gradlew clean : Xóa cache build.
npm start -- --reset-cache : Xóa cache.

# 10:Test Push noti Key pushtry Pro:

# 11: Vào android chạy: ./gradlew assembleRelease

# 12: Đẩy lệnh code push android: appcenter codepush release-react -a Kusuri/Kusuri-Android -d Production -m

# =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS

# IOS:

# 1:Cấu hình System.js.

const versionApp = isIos ? ‘2.1.6’ : ‘2.1.6’
//Product:
export const APP_ID = "1558940708628";
export const COMPANY_ID = "1558940700681";
export const URL_SHOP = "https://kusuri-aoki-shop-info.com";
export const URL_DOMAIN = "https://kusuri-aoki.shop-analyze.com";
export const SENDER_ID = "867275678656";

# 2:Cấu hình Xcode:

Thay tên App : クスリのアオキ公式アプリ
Thay bundle id: jp.co.kusuriaoki.ios.public
Tăng version App: 2.1.6
Reset bản build về 1.

# 3 : Thay App ID trong info.split

<key>AdsAppID</key>
<string>KAOKI01</string>

# 4: Thay key codePush:

<key>CodePushDeploymentKey</key>
<string>vw8YC-uyrJorXh2H2mIrXY0CBSSSizq496-VT</string>

# 5: Cấu hình SDK :

# =>Giải nén pro, coppy file libsdk-advertise.a trong react-native-shop-sdk/ios ném vào thư mục ios/yakuodo.

# => Mở XCode lên link SDK bằng tay.

const onClickApi = (notificationId, memberCode, deviceId) => {
if (memberCode !== undefined || memberCode !== null) {
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&memberCode=${memberCode}&deviceId=${deviceId}`;
}
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&deviceId=${deviceId}`;
};

# 5: Kiểm tra lại deepLink trong Xcode ==> domain: yakuodo.shop-analyze.com.

# 6: Kiểm tra lại certificate , quyền build và đẩy App .

# 7: Login kiểm tra SDK.

Tài khoản check Pro:  
8090127700000400
PIN : 7926
OTP: 123456
