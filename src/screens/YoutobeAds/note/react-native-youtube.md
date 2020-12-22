react-native-youtube
Link: https://github.com/davidohayon669/react-native-youtube

# Cấu hình IOS:

Thêm pod 'XCDYouTubeKit', '~> 2.8' vào pod

# Đăng nhập: https://console.cloud.google.com (namtx@rabiloo.com)

# Tạo 1 project mới: React Native Base

# Vào https://console.cloud.google.com/apis/library

Tạo key Youtobe:
YouTube Data API v3
Enable APi lên
Đợi nó Active API lên khác tự chuyển sang màn hình https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials?authuser=1&project=react-native-base-289706

Chọn Create Credentials => API key created
Sau khi sinh ra 1 key: AIzaSyBXHSKE791ah1TTBaS9SP9uthF35nXsq1g
Chọn Restrict Key.

# Có 2 lựa chọn cần phải cài đặt:

# Application restrictions

An application restriction controls which websites, IP addresses, or applications can use your API key. You can set one application restriction per key.
None (Chọn None)
HTTP referrers (web sites)
IP addresses (web servers, cron jobs, etc.)
Android apps
iOS apps
(Phần này cấu hình để hạn chế ứng dụng có thể truy cập)

# API restrictions

API restrictions specify the enabled APIs that this key can call
Chọn Restrict key
Ở phần select API mà key này có thể kích hoạt:
Chọn YouTube Data API v3. => SAVE ( Thấy API tích xanh là OK)

# AIzaSyBXHSKE791ah1TTBaS9SP9uthF35nXsq1g đã được đăng kí với YouTube Data API v3.

Sửa lỗi video not Unavailable IOS: https://github.com/davidohayon669/react-native-youtube/issues/314
Lỗi video không khả dụng.
