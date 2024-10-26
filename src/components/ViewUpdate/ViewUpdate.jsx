import axios from 'axios'
import BeforeAfterSlider from '../services/SliderBeforeAfterExample'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../../styles/ViewUpdate.css'
import '../../styles/Buttons.css'
import Image2 from '../../assets/after-img.png'
import Image1 from '../../assets/before-img.png'

const api_url = 'http://192.168.1.25:3001/api/v1/photos'

const ViewUpdate = () => {
	const [searchParams] = useSearchParams()
	const id = searchParams.get('id')

	const [data, setData] = useState(null)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(api_url, {
					headers: {
						Authorization: `${localStorage.getItem('token')}`,
					},
				})
				setData(response.data.data)
			} catch (error) {
				setError(error.message)
				console.log('Ошибка в получении данных от сервера')
				console.log(error.message)
			}
		}

		fetchData()
	}, [])

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	if (!data) {
		return <div>Загрузка...</div>
	}

	const img = data.find(item => item.Id == id)

	if (!img) {
		return <div>Фотография с ID {id} не найдена</div>
	}

	console.log(img)
	const beforeUrl = img.PhotoUrlBefore
	const afterUrl = img.PhotoUrlAfter

	const downloadImage = async (url, name) => {
		try {
			const response = await axios.get(url, {
				responseType: 'blob',
			})
			const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = blobUrl
			link.setAttribute('download', name)
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(blobUrl)
		} catch (error) {
			console.error('Ошибка при скачивании изображения:', error)
		}
	}

	return (
		<section className='updatedView' style={{ height: '100vh' }}>
			<BeforeAfterSlider
				BeforeImg={beforeUrl}
				AfterImg={afterUrl}
				size='700px'
			/>
			<div
				style={{
					marginTop: '20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '30px',
				}}
			>
				<button
					className='download-btn btn'
					onClick={() => downloadImage(beforeUrl, 'before-image.jpg')}
				>
					Скачать "До"
				</button>
				<button
					className='download-btn btn'
					onClick={() => downloadImage(afterUrl, 'after-image.jpg')}
				>
					Скачать "После"
				</button>
			</div>
		</section>
	)
}

export default ViewUpdate
