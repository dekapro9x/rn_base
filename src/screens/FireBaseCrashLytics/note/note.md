Cài đặt:
yarn add @react-native-firebase/app
yarn add @react-native-firebase/crashlytics
cd ios/ && pod install
https://rnfirebase.io/crashlytics/usage

Vào https://console.firebase.google.com/ => https://console.firebase.google.com/u/0/project/rn-base-f142e/crashlytics/app/android:com.rn_base.dev/issues

# Enable Crashlytics

=> Thấy dòng đang đợi kích hoạt tính năng:

# Android

Add Firebase SDK for Android (version 17.1.1 or later) or Unity plug-in (version 6.15.0 or later), then build, run and crash your app
Consult the SDK documents. We will monitor the communications recorded between your application and our servers.
https://rnfirebase.io/crashlytics/android-setup
//Thêm dòng này cấu hình firebase-crashlytics:
implementation 'com.google.firebase:firebase-crashlytics-ndk:17.2.1'
//Thêm dòng này cấu hình firebase-crashlytics:
// classpath 'com.google.firebase:firebase-crashlytics-gradle:2.2.0' (Lỗi hạ xuống 2.0.0)
//https://github.com/invertase/react-native-firebase/issues/4253
classpath 'com.google.firebase:firebase-crashlytics-gradle:2.0.0'

# IOS:

Add the Firebase SDK for iOS (version 4.3.0 or later) or the Unity plug-in (version 6.15.0 or later), then build, run and crash your app
Consult the SDK documents. We will monitor the communications recorded between your application and our servers.
