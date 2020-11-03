# =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA =>>>>>>>> YONEYAMA

# Các bước cấu hình Yone Product Yoneyama Android: (Bản 1.0.3) Bản 5.

# Chú ý:

Nếu đẩy code push thì check lại version trên Server, chỉ đẩy phần sửa đổi JS.
Sau đó chạy lệnh đẩy code push.
Còn sửa native cập nhật APK lên Apstore thì nhớ tăng version lên 1.
Đẩy IOS lên testFlight, cập nhật thông tin bản vá.
Sau đó chạy lệnh code push.
Chú ý: Nếu đẩy code push thì check lại version trên Server, chỉ đẩy phần sửa đổi JS.
Còn sửa native cập nhật APK lên Apstore thì nhớ tăng version lên 1.Đẩy IOS lên testFlight, cập nhật thông tin bản vá.

# Các bước cấu hình Yoneyama Product Android: (1.0.3)

# Android:

# 1:Cấu hình trong System.js:

// Product:
const versionApp = isIos ? ‘1.0.3’ : ‘1.0.3’;
const versionCodePush = isIos ? '0' : '0';
const APP_ID1 = '1593254256879';
const APP_ID2 = '1593254268116';
const URL_DOMAIN = 'https://app-cms-yoneyama.com';  
const COMPANY_ID = '1593254241992';

# 2: Đổi tên App và key Code push trong AndroidManifest.xml:

<string name="app_name">ヨネヤマ公式</string>
<string moduleConfig="true" name="CodePushDeploymentKey">Rhb1dKY33xwdKFbtIRDhBSj6t1y21qS9gonss</string>

# 3: Đổi google-services (Con này key của Store giống như là keyStore bên Dev nên ko cần đổi)

"project_number": "1063382257103",
"firebase_url": "https://yoneyama-35ce8.firebaseio.com",
"project_id": "yoneyama-35ce8",
"storage_bucket": "yoneyama-35ce8.appspot.com"

# 4: Kiểm tra SDK và Push (CHANNEL ID) trong AndroidManifest.xml:

 <!-- channel_name -->
  <meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_name" android:value="jp.co.yoneyama.android.dev"/>
    <meta-data android:name="com.dieam.reactnativepushnotification.notification_channel_description" android:value="YOUR NOTIFICATION CHANNEL DESCRIPTION"/>
    <!-- sdk -->
  <meta-data android:name="ads_app_id" android:value="YONE_01"/>
    <meta-data android:name="ads_app_key" android:value=""/>
    <meta-data android:name="ads_app_name" android:value="ヨネヤマプランテーションアプリ"/>
    <meta-data android:name="ads_company_id" android:value="INC_YONEYAMA"/>
    <!-- sdk -->

# 5: Thay đổi versionCode và versionName trong app/build.gradle:

versionCode 5
versionName “1.0.3”

# 6: Build 1 bản APK và chạy lệnh để đẩy code push: appcenter codepush release-react -a Yoneyama/Yoneyama-Android -d Production -m

# 7: Xóa cache và build lại app:

cd android && ./gradlew clean : Xóa cache build.
npm start -- --reset-cache : Xóa cache.

# 8:Test Push noti Key pushtry Pro:

AAAA95aFjc8:APA91bHPpzEbjhUgs9YtSivV4K\_\_Mz9V56vNSu2X42I9ObD3RU1wvBkGB94OC63Ca8TWHAREHHSeSghpIDzvG5zTmVrwWb41fh6bKlahk_GutBZ_a4KjI4o_5h1bMPg5uvXgx8u65sEN
=> (Xóa 2 cái gạch \\ này đi)

# 9: Vào android chạy: ./gradlew assembleRelease

# =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS =>>>>>>>> IOS

# IOS:

# 1:Cấu hình trong System.js:

//product:
const versionApp = isIos ? ‘1.0.4’ : ‘1.0.4’;
const versionCodePush = isIos ? '0' : '0';
const APP_ID1 = '1593254256879';
const APP_ID2 = '1593254268116';
const URL_DOMAIN = 'https://app-cms-yoneyama.com';
const COMPANY_ID = '1593254241992';

# 2: Cấu hình Xcode:

Đổi bundle : jp.co.yoneyama.ios.id.public
Thay tên App : ヨネヤマ公式 .
Tăng version App 1.0.4.  
Reset bản build về 1.

# 3: Đổi key Code push:

<key>CodePushDeploymentKey</key>
<string>IxO5lUEjLuMwfsAeXtE70SY2wkf29UuusyZ1u</string>

# 4 : Cấu hình SDK (Phần này Dev cấu hình sẵn rồi chỉ kiểm tra lại ).

# => Giải nén pro, coppy file libsdk-advertise.a trong react-native-shop-sdk/ios ném vào thư mục ios/komeda_app.

# => Mở XCode lên link SDK bằng tay => Add File To komeda_app => react-native-shop-sdk/ios/libsdk-advertise.a

# => Kiểm tra cấu hình trong react-native-shop-sdk/weblink:

const onClickApi = (notificationId, memberCode, deviceId) => {
if (memberCode !== undefined || memberCode !== null) {
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&memberCode=${memberCode}&deviceId=${deviceId}`;
}
return `http://sdk-ads-analyze.com/app/api/notification/onClick?notificationId=${notificationId}&deviceId=${deviceId}`;
};

# 5:Kiểm tra lại certificate , quyền build và đẩy App :

# 6: Chạy lệnh Code push: appcenter codepush release-react -a Yoneyama/Yoneyama-IOS -d Production

Tài khoản test Pro:
08032065556 shinto10
