import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import axios from 'axios'

import { useAuth } from '../contexts/AuthContext'

const Chats = () => {
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	const { user } = useAuth()

	console.log(user)

	const handleLogout = async () => {
		await auth.signOut()
		history.push('/')
	}

	const getFile = async (url) => {
		const response = await fetch(url)
		const data = await response.blob()
		return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
	}

	useEffect(() => {
		if (!user) {
			history.push('/')
			return
		}

		axios
			.get('https://api.chatengine.io/users/me', {
				headers: {
					'project-id': '7d1996fe-3308-42a8-a7b9-e6008bc48b5e',
					'user-name': user.email,
					'user-secret': user.uid,
				},
			})
			.then(() => {
				setLoading(false)
			})
			.catch(() => {
				let formdata = new FormData()
				formdata.append('email', user.email)
				formdata.append('username', user.email)
				formdata.append('secret', user.uid)

				getFile(user.photoURL).then((avatar) => {
					formdata.append('avatar', avatar, avatar.name)

					axios
						.post('https://api.chatengine.io/users', formdata, {
							headers: {
								'private-key': 'c2acd860-7862-4202-9561-04e6145fa00d',
							},
						})
						.then(() => setLoading(false))
						.catch((error) => console.log(error))
				})
			})
	}, [user, history])

	if (!user || loading) return 'Loading...'

	return (
		<div className='chats-page'>
			<div className='nav-bar'>
				<div className='logo-tab'>Unichat</div>
				<div className='logout-tab' onClick={handleLogout}>
					Logout
				</div>
			</div>

			<ChatEngine
				height='calc(100vh - 66px)'
				projectID='7d1996fe-3308-42a8-a7b9-e6008bc48b5e'
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	)
}

export default Chats
