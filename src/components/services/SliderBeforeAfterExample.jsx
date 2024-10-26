import React from 'react'
import ReactCompareImage from 'react-compare-image'

const BeforeAfterSlider = ({ BeforeImg, AfterImg, size }) => {
	return (
		<div
			style={{
				width: '100%',
				maxWidth: `${size}`,
				margin: '0 auto',
				padding: '30px',
				backgroundColor: 'white',
				borderRadius: '10px',
				position: 'relative',
			}}
		>
			<ReactCompareImage
				leftImage={BeforeImg}
				rightImage={AfterImg}
				sliderLineColor='#fff'
				sliderLineWidth={2}
				handleSize={40}
				handleColor='#fff'
				hover={false} // Отключаем автоматическое перемещение при наведении
				leftImageCss={{ borderRadius: '10px' }}
				rightImageCss={{ borderRadius: '10px' }}
				handle={
					<div
						style={{
							width: '40px',
							height: '40px',
							backgroundColor: '#fff',
							borderRadius: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
						}}
					>
						<div
							style={{
								width: '10px',
								height: '10px',
								backgroundColor: '#000',
								borderRadius: '50%',
							}}
						/>
					</div>
				}
			/>
			<div
				style={{
					position: 'absolute',
					top: '35px',
					left: '35px',
					color: 'white',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					padding: '5px 10px',
					borderRadius: '5px',
				}}
			>
				До
			</div>
			<div
				style={{
					position: 'absolute',
					top: '35px',
					right: '35px',
					color: 'white',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					padding: '5px 10px',
					borderRadius: '5px',
				}}
			>
				После
			</div>
		</div>
	)
}

export default BeforeAfterSlider
