import React, { useEffect, useState } from 'react'
import '../../styles/Auth.css'
import '../../styles/Fonts.css'
import { loginUser } from '../services/apiService.js'
import { useNavigate } from 'react-router-dom'

export default function Authorization() {
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Авторизация'
	})

	const handleSubmit = async event => {
		event.preventDefault()
		if (!emailError && !passwordError) {
			try {
				const credentials = {
					email: email,
					password: password,
				}
				const response = await loginUser(credentials)
				console.log('Вход успешен:', response)
				console.log(response.data.token)
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('email', response.data.user.email)
				navigate('/')
				// Дополнительная логика после успешного входа
			} catch (error) {
				console.error('Ошибка входа:', error)
				// Обработка ошибки, например, отображение сообщения пользователю
			}
		} else {
			console.log('Форма содержит ошибки')
		}
	}

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('Введите email')
	const [passwordError, setPasswordError] = useState(
		'Пароль не может быть пустым'
	)
	const [showPassword, setShowPassword] = useState(false)
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [passwordError, emailError])

	function handleShowPassword() {
		setShowPassword(!showPassword)
	}

	function handleEmail(e) {
		setEmail(e.target.value)
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректный e-mail')
		} else {
			setEmailError('')
		}
	}

	function handlePassword(e) {
		setPassword(e.target.value)
		if (e.target.value.length < 8) {
			setPasswordError('Пароль должен быть не менее 8 символов')
		} else {
			setPasswordError('')
		}
	}

	function blurHandler(e) {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	return (
		<div className='auth-block'>
			<div className='authorization'>
				<form onSubmit={handleSubmit} className='authorization-form'>
					<h1 className='form-title title'>Вход</h1>

					<label htmlFor='email' className='form-label'>
						<h3 className='text'>E-mail</h3>
						{emailDirty && emailError && (
							<div style={{ color: 'red' }}>{emailError}</div>
						)}
						<input
							type='email'
							name='email'
							id='email'
							className='form-input form-input__email'
							value={email}
							onChange={handleEmail}
							onBlur={e => blurHandler(e)}
						/>
					</label>

					<label htmlFor='password' className='form-label'>
						<h3 className='text'>
							Пароль{' '}
							{/* <a className='password-forget link' href='#'>
								Забыл?
							</a> */}
						</h3>
						{passwordDirty && passwordError && (
							<div style={{ color: 'red' }}>{passwordError}</div>
						)}
						<input
							type={showPassword ? 'text' : 'password'}
							name='password'
							id='password'
							className='form-input form-input__password'
							value={password}
							onChange={handlePassword}
							onBlur={e => blurHandler(e)}
						/>
					</label>

					<button
						disabled={!formValid}
						className='form-submit btn'
						type='submit'
					>
						Вход
					</button>

					<div className='not-account'>
						<a className='password-login link' href='/registration'>
							Нет аккаунта?
						</a>
					</div>
				</form>
			</div>
		</div>
	)
}
