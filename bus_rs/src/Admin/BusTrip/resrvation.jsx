import { useState, useEffect } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
	GridRowModes,
	DataGridPro,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
  } from '@mui/x-data-grid-pro';
import axios from 'axios';
  import {
	randomCreatedDate,
	randomTraderName,
	randomId,
	randomArrayItem,
  } from '@mui/x-data-grid-generator';
  
const columns = [
	{
		field: 'TripName',
		headerName: 'Trip Name',
		width: 180,
		editable: true,
	},
	{
		field: 'DepartingCity',
		headerName: 'Source City',
		width: 100,
		editable: true,
	},
	{
		field: 'DestinationCity',
		headerName: 'Destination City',
		width: 100,
		editable: true,
	},
	{
		field: 'Date',
		headerName: 'Date',
		description: 'This column has a value getter and is not sortable.',
		width: 100,
	},
	{
		field: 'Time',
		headerName: 'Start Time',
		width: 90,
	},
	{
		field: 'Arriv_Time',
		headerName: 'Arrival Time',
		width: 90,
	},
	{
		field: 'actions',
		type: 'actions',
		headerName: 'Actions',
		width: 100,
		cellClassName: 'actions',
		getActions: ({ id }) => {
		//   const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
		//   if (isInEditMode) {
			return [
			  <GridActionsCellItem
				icon={<SaveIcon />}
				label="Save"
				sx={{
				  color: 'primary.main',
				}}
				// onClick={handleSaveClick(id)}
			  />,
			//   <GridActionsCellItem
			// 	icon={<CancelIcon />}
			// 	label="Cancel"
			// 	className="textPrimary"
			// 	// onClick={handleCancelClick(id)}
			// 	color="inherit"
			//   />,
			];
		//   }
  
		  return [
			<GridActionsCellItem
			  icon={<EditIcon />}
			  label="Edit"
			  className="textPrimary"
			//   onClick={handleEditClick(id)}
			  color="inherit"
			/>,
			<GridActionsCellItem
			  icon={<DeleteIcon />}
			  label="Delete"
			//   onClick={handleDeleteClick(id)}
			// onClick={() => onDeleteTrip(item._id)}
			  color="inherit"
			/>,
		  ];
		},
	  },
	];


const Resrvation = () => {
	const [Data, setData] = useState([])
	const [formError, setFormError] = useState("");
	async function getRecords() {
		const response = await fetch(`http://localhost:8000/trip/fetch/`);
		if (!response.ok) {
			const message = `An error occurred: ${response.statusText}`;
			window.alert(message);
			return;
		}
		const records = await response.json();
		setData(records);
	}
	useEffect(() => {
		getRecords()
	})



	const onDeleteTrip = async (id) => {
		if (window.confirm("Are you sure you want remove trip")) {
			const response = await axios.delete(`http://localhost:8000/trip/delete/${id}`);
			if (response.status === 200) {
				// console.log(response.data);
				setFormError(response.data)
				// toast.success(response.data);
				getRecords();
			}
			else {
				console.log(window.alert("DB not connected"))
			}
		}
	}
	return (
		<div className="main" >
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
						
					<Box sx={{ height: 400, width: '100%' }}>
							<DataGrid
								rows={Data}
								columns={columns}
								editMode='row'
								getRowId={(row) => row._id}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: 5,
										},
									},
								}}
								pageSizeOptions={[5]}
								checkboxSelection
								disableRowSelectionOnClick
							/>
						</Box>
						{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
					</section>
				</div>
			</main>
		</div>
	)
}
export default Resrvation