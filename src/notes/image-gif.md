Thêm cấu hình ảnh Gif trong android/app/build.gradle
Trong dependencies:
//Thêm cấu hình ảnh gif.
// If your app supports Android versions before Ice Cream Sandwich (API level 14)
implementation 'com.facebook.fresco:animated-base-support:1.3.0'

    // For animated GIF support
    implementation 'com.facebook.fresco:animated-gif:2.0.0'

     // For WebP support, including animated WebP
    implementation 'com.facebook.fresco:animated-webp:2.1.0'
     implementation 'com.facebook.fresco:webpsupport:2.0.0'

    // For WebP support, without animations
    implementation 'com.facebook.fresco:webpsupport:2.0.0'

    implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0"
