import * as Google from 'expo-google-app-auth';

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: YOUR_CLIENT_ID_HERE,
      iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
        alert("Funfou");
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
