import { initializeApp } from 'firebase/app'
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithRedirect,
	onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyCWdh5V-iPXQWWWeLRwYqRw_-r5UfaQ0U0',
	authDomain: 'unichat-cee73.firebaseapp.com',
	projectId: 'unichat-cee73',
	storageBucket: 'unichat-cee73.appspot.com',
	messagingSenderId: '803291118495',
	appId: '1:803291118495:web:11ed51641050e31e7adbaa',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// export
export const auth = getAuth(app)
// initialize this way ^^^
export const googleAuthProvider = new GoogleAuthProvider()
export const facebookAuthProvider = new FacebookAuthProvider()

export const signInWithRedirectAuth = (auth, provider) => {
	return signInWithRedirect(auth, provider)
}

export const onAuthStateChangedFire = (auth, fn) => {
	return onAuthStateChanged(auth, fn)
}

/* =============== */

// import firebase from 'firebase/app'
// import 'firebase/auth'

// export const auth = firebase
// 	.initializeApp({
// 		apiKey: 'AIzaSyCWdh5V-iPXQWWWeLRwYqRw_-r5UfaQ0U0',
// 		authDomain: 'unichat-cee73.firebaseapp.com',
// 		projectId: 'unichat-cee73',
// 		storageBucket: 'unichat-cee73.appspot.com',
// 		messagingSenderId: '803291118495',
// 		appId: '1:803291118495:web:11ed51641050e31e7adbaa',
// 	})
// 	.auth()
