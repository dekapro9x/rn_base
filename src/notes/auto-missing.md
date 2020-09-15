https://stackoverflow.com/questions/35739361/itsappusesnonexemptencryption-export-compliance-while-internal-testing
Đây là tính năng của Apple khi build xong app và đẩy lên TestFlight sẽ auto public App:
Thêm :
<key>ITSAppUsesNonExemptEncryption</key>  
<false/>
Vào info.split dòng 21
