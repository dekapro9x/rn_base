# 1.Android 8 không support http:

Key: Make an HTTP request with android
Link : https://stackoverflow.com/questions/3505930/make-an-http-request-with-android

Thêm :
android:usesCleartextTraffic="true" vào AndroidManifest.xml

# 2.Chuyển cấu hình quyền trong Android bị crash App:

Trong mainActivity.java thêm :
@Override
protected void onCreate(Bundle savedInstanceState) {
super.onCreate(null);
}

# 3.Fix issue dex over 64k method in android:

Key:
https://www.google.com/search?sxsrf=ALeKk01CMsLm2R7xstDScmBTUtVJCBWs8Q:1600049126436&q=fix+issue+dex+over+64k+method+in+android&spell=1&sa=X&ved=2ahUKEwiEq7e-x-frAhXEJaYKHWnGDbkQBSgAegQIDxAq&biw=1440&bih=789&dpr=2
Link: https://developer.android.com/studio/build/multidex

# 4.Lưu cache:

IOS:
Mở file ẩn : command ship .
Xóa cache trong DriverData.

Android:
yarn start -- --reset-cache : Xóa cache
cd android && ./gradlew clean : Xóa cache build

# 5.65536 methods for dex. Lỗi nhiều hơn 64k phương thức trong 1 projects:

https://stackoverflow.com/questions/47656823/react-native-android-app-with-64k-methods
Trong android/app/build.gradle
android {
...
defaultConfig {
...
multiDexEnabled true
}
...
}

# 6.Sửa lỗi react native cookie chạy debug được nhưng không thể build release Android:

Link: https://github.com/oblador/react-native-keychain/issues/68

Trong android/build/gradle:
Thêm:
//Sửa lỗi react native cookie chạy debug được nhưng không thể build release:

subprojects {
afterEvaluate {project ->
if (project.hasProperty("android")) {
android {
compileSdkVersion = 29
buildToolsVersion = "29.0.2"
}
}
}
}

# 7.UIDatePicker IOS 14 hiển thị cách chọn ngày giờ khác:

Thêm :
if (@available(iOS 14, *)) {
UIDatePicker *picker = [UIDatePicker appearance];
picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
}
Vào :

- (BOOL)application:(UIApplication _)application didFinishLaunchingWithOptions:(NSDictionary _)launchOptions
  {
  ...
  if (@available(iOS 14, *)) {
  UIDatePicker *picker = [UIDatePicker appearance];
  picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
  }
  ...
  }

# 8.Sửa lỗi [!] [Xcodeproj] Generated duplicate UUIDs:

Link:https://github.com/CocoaPods/CocoaPods/issues/4370

PBXAggregateTarget -- 072CEA044D2EF26F03496D5996BBF59F
PBXAggregateTarget -- 8D7F5D5DD528D21A72DC87ADA5B12E2D
Lỗi này gặp phải khi cấu hình react-native-firebase cho IOS:
Vào pod thêm:
install! 'cocoapods', :deterministic_uuids => false

# 9.Sửa lỗi Expiring Daemon because JVM heap space is exhausted: thiếu ram máy.

Link:https://stackoverflow.com/questions/56075455/expiring-daemon-because-jvm-heap-space-is-exhausted

org.gradle.daemon=true
org.gradle.jvmargs=-Xmx2560m
