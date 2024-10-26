import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Height } from '@mui/icons-material'

const api_url = 'http://192.168.1.25:3001/api/v1/photos'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}))

function createData(
	id,
	PhotoUrlBefore,
	PhotoUrlAfter,
	typeImprove,
	statusImprove
) {
	return { id, PhotoUrlBefore, PhotoUrlAfter, typeImprove, statusImprove }
}

export default function CustomizedTables() {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const navigate = useNavigate()

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
				setError(error)
				console.log('Ошибка в получении данных от сервера')
				console.log(error.message)
			}
		}

		fetchData()
	}, [])

	if (error) {
		return (
			<div
				className='error'
				style={{
					background: '#fff',
					color: 'red',
					width: '1200px',
					height: '500px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '32px',
				}}
			>
				Ошибка: {error.message}
			</div>
		)
	}

	if (data.length === 0) {
		return (
			<div
				className='loading'
				style={{
					background: '#fff',
					width: '1200px',
					height: '500px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '32px',
				}}
			>
				Пока нет данных
			</div>
		)
	}

	const rows = data.map(array =>
		createData(
			array.Id,
			array.PhotoUrlBefore,
			array.PhotoUrlAfter,
			array.TypeImprove,
			array.StatusImprove
		)
	)

	const handleRowClick = id => {
		// Перенаправление на страницу с параметром id
		navigate(`/updateView?id=${id}`)
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell align='center'>Type Improve</StyledTableCell>
						<StyledTableCell align='center'>Status Improve</StyledTableCell>
						<StyledTableCell align='center'>Action</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={index}>
							<StyledTableCell component='th' scope='row'>
								{row.PhotoUrlBefore.slice(44)}
							</StyledTableCell>
							<StyledTableCell align='center'>
								{row.typeImprove}
							</StyledTableCell>
							<StyledTableCell align='center'>
								{row.statusImprove}
							</StyledTableCell>
							<StyledTableCell align='center'>
								<Button
									variant='contained'
									// color={row.statusImprove === 'finished' ? 'primary' : 'error'}
									disabled={row.statusImprove !== 'completed'}
									onClick={() => handleRowClick(row.id)}
								>
									View
								</Button>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
