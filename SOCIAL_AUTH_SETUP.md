# Social Authentication Setup Guide

## Firebase & Social Login Integration

This guide will help you set up Google and Facebook authentication using Firebase.

## Prerequisites

1. Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Google Cloud Console access
3. Facebook Developers account

---

## 📦 Step 1: Install Dependencies

Already done! The following packages are needed:

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin react-native-fbsdk-next react-native-svg
```

---

## 🔥 Step 2: Firebase Setup

### A. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `EasyLandMaintenance`
4. Follow the setup wizard

### B. Add Android App

1. In Firebase Console, click "Add app" → Android
2. Enter Android package name: `com.easyland` (from android/app/build.gradle)
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`

### C. Add iOS App

1. In Firebase Console, click "Add app" → iOS
2. Enter iOS bundle ID: `com.easyland` (from ios/EasyLandMaintenance/Info.plist)
3. Download `GoogleService-Info.plist`
4. Place it in: `ios/GoogleService-Info.plist`

---

## 🔐 Step 3: Google Sign-In Setup

### A. Enable Google Sign-In in Firebase

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Google" provider
3. Add support email

### B. Get Web Client ID

1. In Firebase Console → Project Settings → General
2. Scroll to "Your apps" section
3. Find your Web app (create one if not exists)
4. Copy the **Web client ID** (ends with `.apps.googleusercontent.com`)

### C. Update Firebase Config

Open `src/config/firebaseConfig.js` and replace:

```javascript
GoogleSignin.configure({
  webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

---

## 📘 Step 4: Facebook Login Setup

### A. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" → Continue
4. Enter app name: `EasyLand Maintenance`
5. Add "Facebook Login" product

### B. Configure Facebook Login

1. In Facebook App Dashboard → Settings → Basic
2. Copy **App ID** and **App Secret**
3. In Facebook Login → Settings:
   - Add OAuth redirect URI: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
   - Enable "Client OAuth Login"

### C. Enable Facebook in Firebase

1. Firebase Console → Authentication → Sign-in method
2. Enable "Facebook" provider
3. Enter Facebook App ID and App Secret
4. Copy OAuth redirect URI from Firebase
5. Paste it in Facebook Login settings

---

## 📱 Step 5: Android Configuration

### A. Update android/build.gradle

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

### B. Update android/app/build.gradle

Add at the **bottom** of the file:

```gradle
apply plugin: 'com.google.gms.google-services'
```

Add Facebook SDK:

```gradle
dependencies {
    implementation 'com.facebook.android:facebook-android-sdk:latest.release'
}
```

### C. Update android/app/src/main/AndroidManifest.xml

Add inside `<application>` tag:

```xml
<meta-data 
    android:name="com.facebook.sdk.ApplicationId" 
    android:value="@string/facebook_app_id"/>
    
<meta-data 
    android:name="com.facebook.sdk.ClientToken" 
    android:value="@string/facebook_client_token"/>
```

### D. Create android/app/src/main/res/values/strings.xml

```xml
<resources>
    <string name="app_name">EasyLandMaintenance</string>
    <string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
    <string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
</resources>
```

---

## 🍎 Step 6: iOS Configuration

### A. Install Pods

```bash
cd ios
pod install
cd ..
```

### B. Update ios/Podfile

Add at the top:

```ruby
platform :ios, '13.0'
```

### C. Configure URL Schemes

1. Open `ios/EasyLandMaintenance.xcworkspace` in Xcode
2. Select project → Info tab
3. Add URL Scheme:
   - Identifier: `com.googleusercontent.apps.YOUR_CLIENT_ID`
   - URL Schemes: `com.googleusercontent.apps.YOUR_CLIENT_ID_HERE`

4. Add Facebook URL Scheme:
   - Identifier: `fb`
   - URL Schemes: `fbYOUR_FACEBOOK_APP_ID`

### D. Update Info.plist

Add before `</dict>`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>fbYOUR_FACEBOOK_APP_ID</string>
        </array>
    </dict>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
        </array>
    </dict>
</array>

<key>FacebookAppID</key>
<string>YOUR_FACEBOOK_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_FACEBOOK_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>EasyLandMaintenance</string>

<key>LSApplicationQueriesSchemes</key>
<array>
    <string>fbapi</string>
    <string>fb-messenger-share-api</string>
    <string>fbauth2</string>
    <string>fbshareextension</string>
</array>
```

---

## 🖥️ Step 7: Backend Implementation

Create a new endpoint in your backend: `POST /api/auth/social-login`

**File: backend/controllers/authController.js**

```javascript
exports.socialLogin = async (req, res) => {
  try {
    const { provider, providerId, email, fullName, profilePicture } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        email,
        fullName,
        profilePicture,
        authProvider: provider,
        providerId,
        role: 'customer',
        isVerified: true, // Auto-verify social login users
      });
    } else {
      // Update existing user's social auth info
      user.authProvider = provider;
      user.providerId = providerId;
      if (profilePicture) user.profilePicture = profilePicture;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
```

**File: backend/routes/authRoutes.js**

Add this route:

```javascript
router.post('/social-login', authController.socialLogin);
```

**File: backend/models/User.js**

Add these fields to the User schema:

```javascript
authProvider: {
  type: String,
  enum: ['local', 'google', 'facebook'],
  default: 'local',
},
providerId: {
  type: String,
},
```

---

## 🧪 Step 8: Testing

### Test on Android

```bash
npx react-native run-android
```

### Test on iOS

```bash
npx react-native run-ios
```

### Test Flow

1. Open the app
2. Navigate to Login screen
3. Click "Continue with Google"
   - Should open Google account picker
   - Select account
   - Should navigate to Main screen on success

4. Click "Continue with Facebook"
   - Should open Facebook login
   - Enter credentials
   - Should navigate to Main screen on success

---

## 🐛 Troubleshooting

### Google Sign-In Issues

**Error: DEVELOPER_ERROR**
- Ensure SHA-1 fingerprint is added to Firebase
- Get SHA-1: `cd android && ./gradlew signingReport`
- Add it in Firebase Console → Project Settings → Your apps → SHA certificate fingerprints

**Error: Sign in action cancelled**
- User cancelled the flow (this is normal)

### Facebook Login Issues

**Error: Invalid key hash**
- Generate key hash:
  ```bash
  keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
  ```
- Add it to Facebook App → Settings → Basic → Key Hashes

**Can't load URL**
- Check Facebook App ID is correct in strings.xml and Info.plist

### Common Issues

**Build fails on Android**
- Run `cd android && ./gradlew clean`
- Delete `android/app/build` folder
- Rebuild

**Pods installation fails on iOS**
- Run `cd ios && pod deintegrate && pod install`
- Clean build folder in Xcode

---

## 📋 Checklist

- [ ] Firebase project created
- [ ] google-services.json downloaded and placed
- [ ] GoogleService-Info.plist downloaded and placed
- [ ] Google Sign-In enabled in Firebase
- [ ] Web Client ID added to firebaseConfig.js
- [ ] Facebook App created
- [ ] Facebook Login configured
- [ ] Facebook App ID/Secret added to Firebase
- [ ] Android configuration complete
- [ ] iOS configuration complete
- [ ] Backend endpoint created
- [ ] Tested Google Sign-In
- [ ] Tested Facebook Login

---

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Facebook Developers](https://developers.facebook.com/)
- [React Native Firebase Docs](https://rnfirebase.io/)
- [Google Sign-In Docs](https://github.com/react-native-google-signin/google-signin)
- [Facebook SDK Docs](https://github.com/thebergamo/react-native-fbsdk-next)

---

## 🎉 Success!

Once everything is configured, users can:
- Sign in with their Google account
- Sign in with their Facebook account
- Automatically create an account on first login
- Profile picture and name are auto-filled

Both methods will create a JWT token and save user data, just like regular email/password login!
