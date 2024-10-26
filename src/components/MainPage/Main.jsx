import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BeforeAfterSlider from '../services/SliderBeforeAfterExample.jsx'
import ExampleImg from '../../assets/example.png'
import BeforeImg_1 from '../../assets/before-img.png'
import AfterImg_1 from '../../assets/after-img.png'
import BeforeImg_2 from '../../assets/before-img_2.png'
import AfterImg_2 from '../../assets/after-img_2.png'
import Upload from '../services/UploadFile.jsx'
import '../../styles/Main.css'
import '../../styles/Fonts.css'
import '../../styles/Buttons.css'
import { useNavigate } from 'react-router-dom'

const MAIN_TITLE =
	'Улучшай качество с нами! Мы верим, что качество – это не просто слово, а образ жизни.'
const MAIN_TEXT =
	'С нами ты сможешь повысить уровень своей работы. Развивай свои навыки и знания, чтобы стать настоящим экспертом в своей области.'

export default function Main() {
	useEffect(() => {
		document.title = 'Главная'
	})
	return (
		<div className='main'>
			<HeroSection />
			<KitsSection />
		</div>
	)
}

function HeroSection() {
	return (
		<section className='hero'>
			<div className='hero__container container'>
				<div className='main-content__hero'>
					<div className='main-info'>
						<Header title={MAIN_TITLE} />
						<Body text={MAIN_TEXT} />
					</div>
					<div className='main-upload'>
						<Upload />
					</div>
				</div>
				<div className='main-content__example'>
					<img src={ExampleImg} alt='Пример работы' className='example-img' />
				</div>
			</div>
		</section>
	)
}

function KitsSection() {
	return (
		<section className='kits' style={{ backgroundColor: '#fff' }}>
			<div className='kits__container container'>
				<span className='kit-title title'>Наборы для улучшения фотографий</span>
				<Kit
					title='Редактирование человеческих фотографий с помощью технологии ИИ'
					text='Увеличьте резкость и уточните размытие на вашем изображении, чтобы сделать его более четким и выделяющимся.'
					beforeImg={BeforeImg_2}
					afterImg={AfterImg_2}
				/>
				<Kit
					title='Масштабируйте художественные изображения'
					text='Достигайте высокого разрешения для всех видов художественных изображений. Превратите генерированные ИИ изображения в реалистичные произведения искусства для печати и демонстрации.'
					beforeImg={BeforeImg_1}
					afterImg={AfterImg_1}
					reverse={false}
				/>
			</div>
		</section>
	)
}

function Kit({ title, text, beforeImg, afterImg, reverse = true }) {
	return (
		<div className={`kit ${reverse ? 'reverse' : ''}`}>
			{reverse ? (
				<>
					<div className='kit-info'>
						<h2 className='kit-info__title title'>{title}</h2>
						<p className='kit-info__text text'>{text}</p>
					</div>
					<BeforeAfterSlider BeforeImg={beforeImg} AfterImg={afterImg} />
				</>
			) : (
				<>
					<BeforeAfterSlider
						BeforeImg={beforeImg}
						AfterImg={afterImg}
						size='390px'
					/>
					<div className='kit-info'>
						<h2 className='kit-info__title title'>{title}</h2>
						<p className='kit-info__text text'>{text}</p>
					</div>
				</>
			)}
		</div>
	)
}

Kit.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	beforeImg: PropTypes.string.isRequired,
	afterImg: PropTypes.string.isRequired,
}

function Header({ title }) {
	return (
		<div className='main-header'>
			<h1 className='main-header__title title'>{title}</h1>
		</div>
	)
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
}

function Body({ text }) {
	return (
		<div className='main-body'>
			<h3 className='main-body__text text'>{text}</h3>
		</div>
	)
}

Body.propTypes = {
	text: PropTypes.string.isRequired,
}
