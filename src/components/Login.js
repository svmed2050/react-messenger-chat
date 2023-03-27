import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import 'firebase/app'
import {
	auth,
	googleAuthProvider,
	facebookAuthProvider,
	signInWithRedirectAuth,
} from '../firebase'

const Login = () => {
	return (
		<div id='login-page'>
			<div id='login-card'>
				<h2>Welcome to Unichat!</h2>

				<div
					className='login-button google'
					onClick={() => signInWithRedirectAuth(auth, googleAuthProvider)}
				>
					<GoogleOutlined /> Sign In with Google
				</div>

				<br />
				<br />

				<div
					className='login-button facebook'
					onClick={() => signInWithRedirectAuth(auth, facebookAuthProvider)}
				>
					<FacebookOutlined /> Sign In with Facebook
				</div>
			</div>
		</div>
	)
}

export default Login
