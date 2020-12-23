react-native-maps
Link :https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md

yarn add react-native-maps -E

# Cấu hình IOS:

# AppDelegate.m

Thêm #import <GoogleMaps/GoogleMaps.h> vào dòng 7.

- (BOOL)application:(UIApplication _)application didFinishLaunchingWithOptions:(NSDictionary _)launchOptions
  {
  ...
  Thêm dòng này: [GMSServices provideAPIKey:@"_YOUR_API_KEY_"];
  ...
  }

# Pod thêm dòng này

(React Native 0.60 and higher) Add the following to your Podfile above the use_native_modules! function and run pod install in the ios folder:

# Cấu hình Map:

rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
pod 'GoogleMaps'
pod 'Google-Maps-iOS-Utils'

cd ios && pod install

Đăng kí API key:

# Vào https://console.cloud.google.com/apis/library

Enable Maps SDK for Android và Maps SDK for iOS

# Vào trang chủ https://console.cloud.google.com/home => APIs & Services => Credentials => Restrict and rename API key (AIzaSyBXHSKE791ah1TTBaS9SP9uthF35nXsq1g) => SAVE

# Thêm Maps SDK for Android và Maps SDK for iOS

---

# Cấu hình Android:

ext {
buildToolsVersion = "29.0.2"
minSdkVersion = 21
compileSdkVersion = 29
targetSdkVersion = 29
// Cấu hình truy cập vị trí:
googlePlayServicesVersion = "+" // default: "+"
}

# android/app/src/main/AndroidManifest.xml:

Thêm :
<meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="AIzaSyCvTGmxbx2YUcaLHA8XYY_sKuOycyNL1P0"/>

   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
