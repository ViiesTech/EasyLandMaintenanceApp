import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// Configure Google Sign-In
// Replace WEB_CLIENT_ID with your actual Web Client ID from Firebase Console
GoogleSignin.configure({
  webClientId: '587798355608-h6or10sjo40q1t8sk6mqk1h7vpknj2b1.apps.googleusercontent.com',
});

export { auth, GoogleSignin, LoginManager, AccessToken };
