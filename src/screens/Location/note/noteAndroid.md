Xin quyền vị trí Android:

Từ Android 10 trở lên sẽ phải xin quyền vị trí ở chế độ background (luôn luôn) còn chỉ cho phép khi xử dụng App sẽ không thể lấy được location ở background.
Các phần cấu hình:

# android/app/src/main/AndroidManifest.xml

<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
