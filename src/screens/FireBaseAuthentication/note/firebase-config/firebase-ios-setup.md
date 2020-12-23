Các bước setup firbase IOS:

# Bước 1: Đăng kí ứng dụng IOS:

com.rabiloo.rnconfigbase
Tên: rn-base-ios
Tải file GoogleService-Info.plist

# Bước 2 : Tải xuống tệp cấu hình và thêm tệp cấu hình vào trong folder firebase-config.

Link Xcode: Add file: Chọn GoogleService-Info.plist

# Bước 3 : Cấu hình SDK:

Cấu hình file AppDelegate.m:

Thêm :
#import <Firebase.h>

- (BOOL)application:(UIApplication _)application didFinishLaunchingWithOptions:(NSDictionary _)launchOptions {
  //Khai báo cấu hình FireBase:
  if ([FIRApp defaultApp] == nil) {
  [FIRApp configure];
  }
  ...
  }

# Bước 4: Cấu hình pod thêm mã khởi tạo:

add the Firebase pod for Google Analytics vào pod:

pod 'Firebase/Analytics'

Chú ý: Trong phần pod này có 1 lỗi gây ra ở firebase do thư viện cung cấp liên quan đến dupilcate uuid:

# Sửa lỗi [!] [Xcodeproj] Generated duplicate UUIDs:

install! 'cocoapods', :deterministic_uuids => false
Tham khảo cách sửa :https://stackoverflow.com/questions/33395675/cocoapods-file-reference-is-a-member-of-multiple-groups/33440077#33440077
https://git.baijiashilian.com/open-ios/BJLiveUI/blob/0.0.4-dylib/demo/Podfile

# Bước 5: Chạy ứng dụng để kiểm tra cấu hình:
