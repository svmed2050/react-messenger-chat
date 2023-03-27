import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase
	.initializeApp({
		apiKey: 'AIzaSyCWdh5V-iPXQWWWeLRwYqRw_-r5UfaQ0U0',
		authDomain: 'unichat-cee73.firebaseapp.com',
		projectId: 'unichat-cee73',
		storageBucket: 'unichat-cee73.appspot.com',
		messagingSenderId: '803291118495',
		appId: '1:803291118495:web:11ed51641050e31e7adbaa',
	})
	.auth()
