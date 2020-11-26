Login tài khoản fb với: react-native-fbsdk
B1: Cài cắm thư viện fb sdk:

# yarn add react-native-fbsdk

# B1: Vào https://developers.facebook.com/

Các bước đăng kí trong phần hình ảnh.
Sau khi đăng kí thành công bắt đầu thiết lập môi trường phát triển.
Làm theo các bước sau:
https://developers.facebook.com/apps/921259178281044/fb-login/quickstart/
Cài đặt Xcode:
https://developers.facebook.com/docs/ios/getting-started/?sdk=
Nhớ đoạn active link : https://github.com/facebook/facebook-ios-sdk chứ không phải https://github.com/facebook/facebook-ios-sdk.(thừa dấu . nên Xcode không active)
Video hướng dẫn :https://www.youtube.com/watch?v=qi1S8k2jsFE

Cấu hình file info.split xong rồi thì cấu hình tiếp Appdelegate.m :
Sau khi cấu hình xong SDK Xcode sẽ fetch sdk về và lưu trong DriverData.
Chạy 2 lệnh:

# pod deintegrate && pod install

để làm sạch dự án và cài lại sdk cho Xcode.
Sửa lỗi :
Redefinition of module 'FBSDKShareKit'
Redefinition of module 'FBSDKCoreKit'
Redefinition of module 'FBSDKShareKit'
Sửa lỗi

# Thêm :

pod 'react-native-fbsdk', :path => '../node_modules/react-native-fbsdk'
pod 'FBSDKCoreKit', :modular_headers => true
pod 'FBSDKLoginKit'
pod 'FBSDKShareKit'
pod 'GoogleSignIn'

3 Lỗi gặp trong ảnh minh họa (Sửa trong pod):
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec', :modular_headers => false
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec', :modular_headers => false
  platform :ios, '10.0'
  use_modular_headers!
  target 'rn_baseTests' do
    inherit! :complete
    # Pods for testing
  end
