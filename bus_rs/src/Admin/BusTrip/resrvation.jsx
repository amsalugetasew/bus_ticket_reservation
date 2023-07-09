import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  GridToolbarContainer,
  GridActionsCellItem
} from '@mui/x-data-grid-pro';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';


function EditToolbar(props) {
  const navigate = useNavigate();
  const handleClick = () => {
   navigate("/Admin/Trip_reg");
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

// const Resrvation = () => {
const Resrvation = () => {
  const [Data, setData] = useState([])
	const [formError, setFormError] = useState("");
  const navigate = useNavigate();
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

    const handleEditClick = (id) => () => {
    navigate(`/Admin/Trip_reg/${id}`);
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm("Are you sure you want remove trip")) {
			const response =  axios.delete(`http://localhost:8000/trip/delete/${id}`);
			if (response.status === 200) {
				setFormError(response.data)
				getRecords();
			}
			else {
				console.log(window.alert("Deleted Successfully"))
			}
		}
  };


  const columns = [
    { field: '_id', headerName: 'ID', width: 180, editable: true },
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
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
	return (
		<div className="main" >
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
          <Box sx={{ height: 400, width: '100%',
          '& .actions': {
									color: 'text.secondary',
								},
								'& .textPrimary': {
									color: 'text.primary',
								}, }}>
							<DataGrid
								rows={Data}
								columns={columns}
								editMode='row'
								getRowId={(row) => row._id}
                slots={{
									toolbar: EditToolbar,
								}}
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
					</section>
				</div>
			</main>
		</div>
	)
}
export default Resrvation