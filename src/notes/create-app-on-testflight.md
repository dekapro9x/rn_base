Các bước đẩy App mới lên Store/TestFlight:

# 1.Vào https://developer.apple.com/ đăng kí tk.

# 2.Vào Identifiers đăng kí và cấp 1 bundle id:

# 3.Phần Register a new bundle id:

# B1:

Chọn Identifier => Chọn App IDs => Phần Select a type chọn App.
Phần Description mô tả app :Viết vài dòng ngắn gọn mô tả app.
Phần bundle id: com.rabiloo.rnconfigbase chọn Push Notifications để đăng kí và cấu hình dịch vụ push => Ấn chọn register.

# B2:

# Vào Certificates tạo 1 request để lấy chứng chỉ build app:

Create a New Certificate =>Software :
Chọn Apple Development.
Đăng nhập tài khoản Xcode ứng với tài khoản Apple Dev.
Vào keyChangeAndAccess tạo 1 request : Mở keyChangeAndAccess => Chọn Certificate Assistant => Request a Certificate.
Tạo request sinh ra file :
CertificateSigningRequest.certSigningRequest
Gửi CertificateSigningRequest.certSigningRequest lên cho App Dev (Đây là file chứng chỉ dưới local)
Sau khi gửi và xác thực thành công sẽ sinh ra 1 file Download Your Certificate : development.cer (CER phần lớn là các tập tin bảo mật. Chúng được các công ty chứng nhận tác quyền bên thứ 3 như VeriSign và Thawte cung cấp để chứng nhận độ xác thực của một trang App/Web.)
File cer này chứa mã hóa certificate .Sau khi download về rồi thì mở nó ra để nó tự giải nén, file này sẽ tự động sinh ra 1 chứng chỉ Appdev cho công ty mà nó đang được select vào.

# Vào Xcode chọn projects :

Chọn Signing&Capability => Chọn automatic manage signing chọn vào TeamDev hoặc công ty đã có chứng chỉ mà mình vừa request lên.
Pase bundle id mà vừa đăng kí vào để nó tự automatic singing vào sinh ra cho 1 Profiles và có thể build App và đẩy.
Lần đầu cài App phải chạy lên máy thật thì mới archive được.

# Vào AppStoreConnect:

Tạp 1 App mới chọn Full Access
Chọn bundle id tương ứng để Xcode đẩy App lên.
