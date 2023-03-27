import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import axios from 'axios'
import { translitRuEn } from '../utils/translit'
import { useAuth } from '../contexts/AuthContext'

const Chats = () => {
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	const { user } = useAuth()

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
					'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
					'user-name':
						user.email ||
						translitRuEn(user.displayName).toLowerCase() + '@gmail.com',
					'user-secret': user.uid,
				},
			})
			.then(() => {
				setLoading(false)
			})
			.catch(() => {
				let formdata = new FormData()
				formdata.append(
					'email',
					user.email ||
						translitRuEn(user.displayName).toLowerCase() + '@gmail.com'
				)
				formdata.append(
					'username',
					user.email ||
						translitRuEn(user.displayName).toLowerCase() + '@gmail.com'
				)
				formdata.append('secret', user.uid)

				getFile(user.photoURL).then((avatar) => {
					formdata.append('avatar', avatar, avatar.name)

					axios
						.post('https://api.chatengine.io/users', formdata, {
							headers: {
								'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY,
							},
						})
						.then(() => {
							setLoading(false)
						})
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
				projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
				userName={
					user.email ||
					translitRuEn(user.displayName).toLowerCase() + '@gmail.com'
				}
				userSecret={user.uid}
			/>
		</div>
	)
}

export default Chats
