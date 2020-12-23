Các bước cấu hình fire base:
yarn add @react-native-firebase/app

# Cấu hình Android:

Cấu hình react-native firebase: https://rnfirebase.io/
Cấu hình project fire base: https://console.firebase.google.com/u/0/project/rn-base-f142e/overview

# Các bước cấu hình react-native firebase:

# Android Setup:

yarn add @react-native-firebase/app

# Vào /android/build.gradle: Dòng 22:

buildscript {
dependencies {
classpath("com.android.tools.build:gradle:3.5.3")
classpath 'com.google.gms:google-services:4.3.3'
}
}

# Vào android/app/build.gradle:

apply plugin: 'com.google.gms.google-services'

# Bước 1: Đăng kí ứng dụng.

Vào AndroidMainifest.xml lấy ra applicationId: com.rn_base
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.rn_base">
Hoặc trong android/app/build.gradle:

defaultConfig {
applicationId "com.rn_base"
minSdkVersion rootProject.ext.minSdkVersion
targetSdkVersion rootProject.ext.targetSdkVersion
versionCode 1
versionName "1.0"
missingDimensionStrategy 'react-native-camera', 'general' //Thêm dòng này nếu cấu hình Camera
//Thêm cấu hình này để cấu hình projects 64k methods:
multiDexEnabled true
}

Sau khi lấy ra applicationId nhập tiếp tên biệt hiệu: rn-base

Chứng chỉ ký gỡ lỗi SHA-1:
Mã này được then ra từ androidStudio:
Variant: release
Config: debug
Store: /Users/\_coz/Projects/rabiloo-2020/rn_base/android/app/rn_config_base.keystore
Alias: rn_config_base
MD5: 27:A8:4E:C2:63:20:96:A7:80:3F:F5:F3:66:FD:C6:74

# SHA1: 4B:5D:41:E2:9A:0C:ED:4E:54:14:18:09:9D:8E:06:7E:20:86:2F:80

SHA-256: 71:0D:0A:AE:95:50:46:92:41:B3:21:ED:59:4B:E7:8E:E1:AB:97:C8:6B:40:4F:5B:28:34:C0:66:6E:C8:4F:B7
Valid until: Monday, January 20, 2048

# Chú ý: Do phần cấu hình build.gradle : applicationIdSuffix ".dev" nên package name của app sẽ là : com.rn_base.dev

Phần này liên quan đến

Ấn vào đăng kí ứng dụng.

# Bước 2 : Đăng kí file cấu hình: google-services.json

Download file google-services.json cho vào thư mục: android/app/google-services.json

# Bước 3: Cấu hình các function để cắm các gói tin cho file google-services.json:

# Bước 4 : Chạy thử ứng dụng android và kiểm tra kết nối.

Phần cấu hình fire base tương ứng với package name sẽ liên quan đến phần applicationIdSuffix ".dev" tức là với package name được build ra sẽ có 1 đuôi .dev đính kèm.
Vì thế mà file cấu hình tương ứng trong google services cũng phải có : "package_name": "com.rn_base.dev" tương ứng => Tương ứng bản pro :applicationIdSuffix ".public"
