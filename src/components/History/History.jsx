import EnhancedTable from '../services/HistoryTable'
import '../../styles/Profile.css'
import { useEffect } from 'react'

const History = () => {
	useEffect(() => {
		document.title = 'История'
	})
	return (
		<div className='history'>
			<section className='profile-history' style={{ height: '100vh' }}>
				<div className='profile-history__container container'>
					<EnhancedTable />
				</div>
			</section>
		</div>
	)
}

export default History
