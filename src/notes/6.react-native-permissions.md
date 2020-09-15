react-native-permissions:
Link:https://github.com/react-native-community/react-native-permissions
Kiểm tra quyền của ứng dụng:
yarn add react-native-permissions
cd ios && pod install.
Trong pod :

Thêm đoạn code sau vào dòng :
Nếu mà có lỗi If you see a No permission handler detected error: Make sure that you have at least one permission handler set up. In some cases the Xcode cache needs to be cleared (Xcode -> Product -> Clean Build Folder)
Ít nhất xin 1 quyền cho app mà xóa xóa cache đi.

# Cấu hình Permission: IOS

permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications.podspec"
pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways.podspec"
pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse.podspec"
pod 'Permission-Camera', :path => "#{permissions_path}/Camera.podspec"
pod 'XCDYouTubeKit', '~> 2.8'

Nếu dùng use_frameworks! thêm dòng này:

# use_frameworks!

#Cấu hình React native-permission
pre_install do |installer|
installer.pod_targets.each do |pod|
if pod.name.eql?('RNPermissions') || pod.name.start_with?('Permission-')
def pod.build_type;
Pod::BuildType.static_library # >= 1.9
end
end
end
end

# info.splist thêm đoạn sau để kiểm tra quyền :

    	<key>NSCameraUsageDescription</key>
    	<string>Camera</string>
    	<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    	<string>Location</string>
    	<key>NSLocationAlwaysUsageDescription</key>
    	<string>Location</string>
    	<key>NSLocationWhenInUseUsageDescription</key>
    	<string>Location</string>

# Cấu hình Permission: Andorid trong AndroidManifest.xml:

  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.VIBRATE" />
  <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.CAMERA" />

Clear DriverData tránh lưu cache và chạy lại:
