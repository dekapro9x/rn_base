Cấu hình fb-sdk cho Android:
https://developers.facebook.com/apps/921259178281044/dashboard/
https://developers.facebook.com/docs/android/getting-started/

1.  Thêm Kho lưu trữ trung tâm Maven vào build.gradle trước dependencies:
    repositories {
    //Thêm cấu hình fb-sdk:
    mavenCentral()
    }
    2: Thay:
    //Thay compile 'com.facebook.android:facebook-android-sdk:[4,5)' thành:
    implementation 'com.facebook.android:facebook-android-sdk:[4,5)'
    Thêm ID ứng dụng Facebook
    Trong strings.xml:
    Thêm:
    <string name="facebook_app_id">921259178281044</string>
    Trong AndroidManifest.xml:
      <!--Thêm đoạn này để cấu hình FB-SDK: https://developers.facebook.com/quickstarts/921259178281044/?platform=android -->
        <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>

Hãy cho chúng tôi biết về dự án Android của bạn
Tên gói
Tên gói là thông tin nhận dạng duy nhất cho ứng dụng Android của bạn. Chúng tôi sử dụng tên này để cho phép mọi người tải xuống ứng dụng của bạn từ Google Play nếu họ chưa cài đặt ứng dụng đó. Bạn có thể tìm tên này trong Android Manifest của mình.
com.rn_base.dev ( applicationIdSuffix ".dev")
<activity android:name="com.zoontek.rnbootsplash.RNBootSplashActivity" android:theme="@style/BootTheme" android:launchMode="singleTask">
=>
Tên lớp hoạt động mặc định
Đây là tên lớp hoàn toàn đủ điều kiện của hoạt động xử lý liên kết sâu. Chúng tôi sử dụng tên này khi liên kết sâu đến ứng dụng của bạn từ ứng dụng Facebook. Bạn cũng có thể tìm thấy tên này trong Android Manifest.

# com.zoontek.rnbootsplash.RNBootSplashActivity

Thêm hash khóa phát hành và hash khóa phát triển
Để đảm bảo tính xác thực của các tương tác giữa ứng dụng và Facebook, bạn cần cung cấp cho chúng tôi hash khóa Android cho môi trường phát triển của mình. Nếu ứng dụng của bạn đã được phát hành, bạn cần thêm cả hash khóa phát hành.
Hiển thị cách tạo hash khóa phát triển
Nếu ứng dụng của bạn đã được phát hành, bạn cũng nên thêm một hash khóa phát hành.
Các ứng dụng Android phải được ký kỹ thuật số bằng khóa phát hành thì bạn mới có thể tải các ứng dụng đó lên cửa hàng. Để tạo hash của khóa phát hành, hãy chạy lệnh sau trên Mac hoặc Windows thay thế ký hiệu viết tắt của khóa phát hành và đường dẫn đến kho khóa của bạn:
Dùng lệnh:

# keytool -exportcert -alias YOUR_RELEASE_KEY_ALIAS -keystore YOUR_RELEASE_KEY_PATH | openssl sha1 -binary | openssl base64

Nếu test thử Login không được thì nó sẽ báo cho 1 mã mới thì tự điền bằng tay vào:
S11B4poM7U5UFBgJnY4GfiCGL4A=

Điều này sẽ tạo ra một chuỗi 28 ký tự mà bạn cần sao chép và dán vào trường bên dưới. Đồng thời, hãy xem Android documentation để ký vào ứng dụng của bạn.

# https://developers.facebook.com/docs/facebook-login/android/

Các API của Fb lấy thông tin cá nhân:
Vào trình khám phá đồ thị lấy API:
https://developers.facebook.com/tools/explorer/
