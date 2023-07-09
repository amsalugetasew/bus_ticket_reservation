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

const TripList = () => {
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
    { field: 'plateNumber', headerName: 'Plate Number', width: 100, editable: true },
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
export default TripList



























































// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import "./table.scss";
// import axios from 'axios';
// import Close from '../../pages/Image/closes.png';
// // import View from '../../pages/Image/view.jfif'
// import Edit from '../../pages/Image/edit.png'
// function TripList() {
//     const [Data, setData] = useState([]);
// 	const [formError, setFormError] = useState("");
// 	async function getRecords() {
// 		const response = await fetch(`http://localhost:8000/trip/fetch/`);
// 		if (!response.ok) {
// 			const message = `An error occurred: ${response.statusText}`;
// 			window.alert(message);
// 			return;
// 		}
// 		const records = await response.json();
// 		setData(records);
// 	}
// 	useEffect(() => {
// 		getRecords();
// 	})

// 	const onDeleteTrip = async (id) => {
// 		if (window.confirm("Are you sure you want remove trip")) {
// 			const response = await axios.delete(`http://localhost:8000/trip/delete/${id}`);
// 			if (response.status === 200) {
// 				// console.log(response.data);
// 				setFormError(response.data)
// 				// toast.success(response.data);
// 				getRecords();
// 			}
// 			else {
// 				console.log(window.alert("DB not connected"))
// 			}
// 		}
// 	}

// 	return (
// 		<div className="main">
// 			<main className="app">
// 				<div className="screen-wrap">
// 					<section className="screen-home">
// 						<div className="screen-home__form-wrap">
// 							<div className="screen-home__form">
// 							<div className="screen-home__recent-search">
// 								<div className="lable">
// 									<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
// 									<span className="text">Recent search</span>
// 								</div>
// 								<table className="styled-table">
// 								<div className="screen-home__rs-wrap">
// 												<ul className="screen-home__rs-row">
// 									<thead >
// 										<tr>
// 											<th style={{width:'15em'}} >Trip</th>
// 											<th >Plate Number</th>
// 											<th >From - To</th>
// 											<th > Date</th>
// 											<th >Action</th>
// 										</tr>
// 									</thead>
// 													</ul></div>
// 									<tbody>
// 										{Data[0] ?
// 											<div className="screen-home__rs-wrap">
// 												<ul className="screen-home__rs-row">
// 													{Data.map((item, i) =>
// 														<>
// 															<tr key={item._id}>
// 																<li className="screen-home__rs-col">
// 																	<td style={{width:'14em'}}>
// 																		<div className="screen-homers-from-to">
// 																			<span>{item.DepartingCity}</span>
// 																			<span className="screen-home__rs-arrow"></span>
// 																			<span>{item.DestinationCity}</span>
// 																		</div>
// 																	</td>
// 																	<td><div className="screen-homers-from-to">
// 																		<span>{item.plateNumber}</span>
// 																	</div>
// 																	</td>
// 																	<td>
// 																		<div className="screen-homers-from-to" style={{marginLeft:'-2em'}}>
// 																			<span>{item.Time}</span>
// 																			<span className="screen-home__rs-arrow"></span>
// 																			<span>{item.Arriv_Time}</span>
// 																		</div>
// 																	</td>
// 																	<td>
// 																		<div className="screen-homers-from-to">
// 																			<span>{item.Date}</span>
// 																		</div>
// 																	</td>
// 																	<td className='display-flex'>
// 																		<Link to={`/Admin/Trip_reg/${item._id}`}>
// 																			<img style={{ width: '30px', height: '30px' }} src={Edit} alt="Cancel" />
// 																		</Link>
// 																		<img onClick={() => onDeleteTrip(item._id)} style={{ width: '30px', height: '30px', cursor:'pointer' }} src={Close} alt="Cancel" />
// 																		{/* <Link to={`/Admin/view/${item._id}`}>
// 																			<img style={{ width: '30px', height: '30px' }} src={View} alt="Cancel" />
// 																		</Link> */}
// 																	</td>
// 																</li>
// 															</tr>
// 														</>
// 													)}
// 												</ul>
// 											</div>
// 											: "Loading..."}
// 									</tbody>
// 								</table>
// 								{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
// 							</div>

// 							</div>
							
// 						</div>
// 					</section>
// 				</div>
// 			</main>
// 		</div>
// 	)
// }


// export default TripList