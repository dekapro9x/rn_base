# B1:Cấu hình push notification:

IOS cần cài 2 thư viện này để có thể nhận được push.
yarn add react-native-push-notification
yarn add @react-native-community/push-notification-ios

# Cấu hình push-notification-ios:

# Cấu hình trong AppDelegate.h

Thêm :
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

# Cấu hình trong AppDelegate.m

#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

# // Thêm 2 dòng này để cấu hình push noti IOS:

UNUserNotificationCenter \*center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = self;

# // Phần thêm để cấu hình Push Notification:

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter _)center willPresentNotification:(UNNotification _)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

// Required for the register event.

- (void)application:(UIApplication _)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData _)deviceToken
  {
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  }
  // Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication _)application didReceiveRemoteNotification:(NSDictionary _)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
  {
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  }
  // Required for the registrationError event.
- (void)application:(UIApplication _)application didFailToRegisterForRemoteNotificationsWithError:(NSError _)error
  {
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
  }
  // Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter _)center
  didReceiveNotificationResponse:(UNNotificationResponse _)response
  withCompletionHandler:(void (^)(void))completionHandler
  {
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  }

# B2:Add file google Services từ Xcode vào projects:

Sau khi Link thành công file

# B3: Đăng kí quyền push và kích hoạt push ứng dụng:

Nếu chưa đăng kí quyền Push và chứng chỉ push sẽ gặp lỗi ErrorAPS.png (Ảnh trong file Eror):

ExceptionsManager.js:179 không tìm thấy chuỗi cấp quyền “aps-environment” hợp lệ cho ứng dụng
{message: "không tìm thấy chuỗi cấp quyền “aps-environment” hợp lệ cho ứng dụng", details: {…}, code: 3000}
code: 3000
details: {NSLocalizedDescription: "không tìm thấy chuỗi cấp quyền “aps-environment” hợp lệ cho ứng dụng"}
message: "không tìm thấy chuỗi cấp quyền “aps-environment” hợp lệ cho ứng dụng"
**proto**: Object

=>>>>> Cấu hình aps Push:

Vào tài khoản Apple tạo chứng chỉ push:
Các bước đăng kí trong phần ảnh cấu hình push.
Sau khi đăng kí thành công có : aps(Pushservices).cer
Mở file .cer ra kiểm tra key PushServices trong Mac.
=> Export ra file P12 để cấu hình push.

Mở Xcode lên đăng kí chức năng push cho ứng dụng => Reset lại máy.
Test Push bằng push try ở môi trường SandBox (Debug) => Production (Release)
