import React, { useState, useRef, useEffect } from 'react'
import UploadImg from '../../assets/UploadImg.svg'
import '../../styles/Upload.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Upload() {
	const navigate = useNavigate()
	const url_api = 'http://192.168.1.25:3001/api/v1/photos'
	const fileInputRef = useRef(null)

	const [file, setFile] = useState(null)
	const [dragging, setDragging] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		checkAuthorization()
	}, [])

	const handleFileChange = e => {
		e.preventDefault()
		const file = e.target.files[0]
		if (file) {
			setFile(file)
			uploadFile(file)
		}
	}

	const handleDragOver = e => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragLeave = e => {
		e.preventDefault()
		setDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setDragging(false)
		const file = e.dataTransfer.files[0]
		if (file) {
			setFile(file)
			uploadFile(file)
		}
	}

	const handleClick = () => {
		fileInputRef.current.click()
	}

	const checkAuthorization = () => {
		if (!localStorage.getItem('token')) {
			navigate('/authorization')
		}
	}

	const uploadFile = async file => {
		if (!file) {
			setErrorMessage('Пожалуйста, выберите файл')
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		const config = {
			method: 'post',
			url: 'http://192.168.1.218:8888/upload',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: formData,
		}

		setLoading(true)
		try {
			const response = await axios(config)
			console.log(response)
			console.log(response.data)
			if (response.status === 200) {
				console.log('Файл успешно загружен')
				console.log('Отправка файла на сервер...')
				try {
					const response_server = await axios.post(
						url_api,
						{
							photo_url_before: response.data,
							type_improve: 'blur',
						},
						{
							headers: {
								Authorization: `${localStorage.getItem('token')}`, // Добавляем токен в заголовок
							},
						}
					)
					console.log(response_server)
					console.log('Файл успешно загружен на сервер')
				} catch (error) {
					console.error('Ошибка при отправке файла на сервер:', error)
					setErrorMessage('Ошибка при отправке файла на сервер')
				}
				setErrorMessage('')
			} else {
				setErrorMessage('Ошибка при загрузке файла')
			}
		} catch (error) {
			if (
				error.code === 'ERR_NETWORK' ||
				error.code === 'ERR_CONNECTION_RESET'
			) {
				setErrorMessage(
					'Проблема с сетевым подключением. Пожалуйста, проверьте ваше подключение к интернету.'
				)
			} else if (error.response && error.response.status === 405) {
				setErrorMessage(
					'Неверный метод запроса. Пожалуйста, убедитесь, что сервер ожидает POST запрос.'
				)
			} else {
				setErrorMessage('Ошибка при загрузке файла')
			}
			console.error('Ошибка:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={`main-upload ${dragging ? 'dragging' : ''}`}
			onClick={handleClick}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<input
				ref={fileInputRef}
				id='fileInput'
				type='file'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<button className='main-upload__btn text btn' disabled={loading}>
				<img src={UploadImg} alt='Загрузка фото' />
				{loading ? 'Загрузка...' : file ? file.name : 'Загрузить изображение'}
			</button>
			{errorMessage && <p className='error-message'>{errorMessage}</p>}
		</div>
	)
}

export default Upload
