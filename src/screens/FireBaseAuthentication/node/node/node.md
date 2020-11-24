Xác thực thông qua firebase bao gồm:
1: Xác thực bằng email, pass.
2: Xác thực bằng số điện thoại.
3: Xác thực bằng tài khoản google.
4: Game center,play game,Fb...

Các bước cấu hình :
link: https://rnfirebase.io/auth/usage

# B1: Cấu hình

# Install & setup the app module

yarn add @react-native-firebase/app

# Install the authentication module

yarn add @react-native-firebase/auth

# If you're developing your app using iOS, run this command

Vào pod thêm dòng : \$FirebaseSDKVersion = '7.0.0' trên đầu file:
pod update Firebase/CoreOnly
pod update Firebase/Auth
pod install --repo-update
cd ios/ && pod install

Sau khi chạy được kiểm tra hàm:  
const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
console.log('%c subscriber', 'color:red', subscriber);
Nếu ra giá trị la tích hợp thành công!
