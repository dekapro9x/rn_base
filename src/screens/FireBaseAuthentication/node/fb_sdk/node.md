Cấu hình FB SDK:
Cài thư viện :
https://github.com/facebook/react-native-fbsdk

Vào FB_Dev:
https://developers.facebook.com/docs/ios/getting-started/?sdk=cocoapods
Info.plist trong <dict>
Thêm:

    <key>CFBundleURLTypes</key>
    	<array>
    		<dict>
    			<key>CFBundleURLSchemes</key>
    			<array>
    				<string>fb921259178281044</string>
    			</array>
    		</dict>
    	</array>
    	<key>FacebookAppID</key>
    	<string>921259178281044</string>
    	<key>FacebookDisplayName</key>
    	<string>rn_base</string>

    	<key>LSApplicationQueriesSchemes</key>
    	<array>
    		<string>fbapi</string>
    		<string>fbapi20130214</string>
    		<string>fbapi20130410</string>
    		<string>fbapi20130702</string>
    		<string>fbapi20131010</string>
    		<string>fbapi20131219</string>
    		<string>fbapi20140410</string>
    		<string>fbapi20140116</string>
    		<string>fbapi20150313</string>
    		<string>fbapi20150629</string>
    		<string>fbapi20160328</string>
    		<string>fbauth</string>
    		<string>fb-messenger-share-api</string>
    		<string>fbauth2</string>
    		<string>fbshareextension</string>
    	</array>

Trong AppDelegate.m thêm:

//Thêm cấu hình Fb SDK:
[[FBSDKApplicationDelegate sharedInstance] application:application
didFinishLaunchingWithOptions:launchOptions];
//Cấu hình Fb\_ SDK:

- (BOOL)application:(UIApplication _)application
  openURL:(NSURL _)url
  options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> \*)options
  {
  [[FBSDKApplicationDelegate sharedInstance] application:application
  openURL:url
  options:options];
  return YES;
  }

Khởi tạo File :

//
// File.swift
// sdk_fb
//
// Created by \_coz on 11/30/20.
//

import Foundation
