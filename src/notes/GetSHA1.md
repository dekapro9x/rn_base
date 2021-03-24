Cách lấy mã SHA1 để cấu hình FireBase:
Dùng lệnh để lấy SHA môi trường Debug:

Dùng lệnh để lấy SHA môi trường product:
MYAPP_KEY_ALIAS=MedicalAppointment
MYAPP_KEY_PASSWORD=BKAV-Medical@2020
MYAPP_STORE_FILE=MedicalAppointment.keystore
MYAPP_STORE_PASSWORD=BKAV-Medical@2020

~/Projects/mobile-medical/android/app$ keytool -list -v -keystore MedicalAppointment.keystore -alias MedicalAppointment

# Link: https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate
