# =>>>>>>>> KUSURI =>>>>>>>> KUSURI =>>>>>>>> KUSURI =>>>>>>>> KUSURI =>>>>>>>> KUSURI =>>>>>>>> KUSURI

# Các bước cấu hình Yone Product Yoneyama Android: (Bản 2.1.6)

# Chú ý:

Nếu đẩy code push thì check lại version trên Server, chỉ đẩy phần sửa đổi JS.
Sau đó chạy lệnh đẩy code push.
Còn sửa native cập nhật APK lên Apstore thì nhớ tăng version lên 1.
Đẩy IOS lên testFlight, cập nhật thông tin bản vá.
Sau đó chạy lệnh code push.
Chú ý: Nếu đẩy code push thì check lại version trên Server, chỉ đẩy phần sửa đổi JS.
Còn sửa native cập nhật APK lên Apstore thì nhớ tăng version lên 1.Đẩy IOS lên testFlight, cập nhật thông tin bản vá.

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

export const versionApp = isIOS ? “2.1.6” : “2.1.6”;
//---production---//
export const APP_ID = "1558940708628";
export const COMPANY_ID = "1558940700681";
export const URL_SHOP = "https://kusuri-aoki-shop-info.com";
export const URL_DOMAIN = "https://kusuri-aoki.shop-analyze.com";
export const SENDER_ID = "867275678656";

# 3: Đổi tên App và key code push trong AndroidManifest.xml:

<string name="app_name">クスリのアオキ公式アプリ</string>
<string moduleConfig="true" name="CodePushDeploymentKey">QvwTX6bVUEdd3RIDjgA-nsrhDuPVRS3y-bXta</string>

# 5:Giải nén google-services product và kiểm tra cấu hình của endpoint google-services:

"project_number": "867275678656",
"firebase_url": "https://kusuriaoki-c1c22.firebaseio.com",
"project_id": "kusuriaoki-c1c22",
"storage_bucket": "kusuriaoki-c1c22.appspot.com"

# 6: Giải nén và kiểm tra SDK và Push (CHANNEL ID) trong AndroidManifest.xml:

<meta-data android:name="ads_app_id" android:value="KAOKI01"/>
<!-- <meta-data android:name="ads_app_id" android:value="YAKUO_DEV"/> -->
<meta-data android:name="ads_app_key" android:value=""/>
<meta-data android:name="ads_app_name" android:value="クスリのアオキ｜公式アプリ"/>
<meta-data android:name="ads_company_id" android:value="INC_KAOKI"/>

# 7: Thay đổi versionCode và versionName trong app/build.gradle:

versionCode 40
versionName "2.1.6"

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

# =>Giải nén pro, coppy file libsdk-advertise.a trong react-native-shop-sdk/ios ném vào thư mục ios/KusuriAoKi.

# => Mở XCode lên link SDK bằng tay.

const onClickApi = (notificationId, memberCode, deviceId) => {
if (memberCode !== undefined || memberCode !== null) {
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&memberCode=${memberCode}&deviceId=${deviceId}`;
}
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&deviceId=${deviceId}`;
};

# 6: Kiểm tra lại certificate , quyền build và đẩy App .

# 7: Login kiểm tra SDK.

Tài khoản check Pro:  
8090127700000400
PIN : 7926
OTP: 123456
