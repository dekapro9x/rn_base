# Android 8 không support http:

Key: Make an HTTP request with android
Link : https://stackoverflow.com/questions/3505930/make-an-http-request-with-android

Thêm :
android:usesCleartextTraffic="true" vào AndroidManifest.xml

# Chuyển cấu hình quyền trong Android bị crash App:

Trong mainActivity.java thêm :
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(null);
}

# Fix issue dex over 64k method in android:

Key:
https://www.google.com/search?sxsrf=ALeKk01CMsLm2R7xstDScmBTUtVJCBWs8Q:1600049126436&q=fix+issue+dex+over+64k+method+in+android&spell=1&sa=X&ved=2ahUKEwiEq7e-x-frAhXEJaYKHWnGDbkQBSgAegQIDxAq&biw=1440&bih=789&dpr=2
Link: https://developer.android.com/studio/build/multidex

# Lưu cache:

IOS:
Mở file ẩn : command ship .
Xóa cache trong DriverData.

Android:
yarn start -- --reset-cache : Xóa cache
cd android && ./gradlew clean : Xóa cache build
