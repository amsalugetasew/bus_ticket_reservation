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
   navigate('/Admin/Bus_reg')
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
const BusList = () => {
  const [Data, setData] = useState([])
	const [formError, setFormError] = useState("");
  const navigate = useNavigate();
	async function getRecords() {
		const response = await fetch(`http://localhost:8000/bus/fetch/`);
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
    navigate(`/Admin/bus_reg/${id}`);
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm("Are you sure you want remove Bus")) {
			const response =  axios.delete(`http://localhost:8000/bus/delete/${id}`);
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
      field: 'plateNumber',
      headerName: 'Plate Number',
      width: 100,
      editable: true,
    },
    {
      field: 'busNumber',
      headerName: 'Bus Number',
      width: 100,
      editable: true,
    },
    {
      field: 'busTitle',
      headerName: 'Bus Name',
      width: 100,
      editable: true,
    },
    {
      field: 'seatNumber',
      headerName: 'Number of Seat',
      width: 100,
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
						{formError && <div className="error_msg" id='error_msg'>{formError}</div>}
					</section>
				</div>
			</main>
		</div>
	)
}
export default BusList







































// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import "./table.scss";
// import axios from 'axios';
// import Close from '../../pages/Image/closes.png';
// // import View from '../../pages/Image/view.jfif'
// import Edit from '../../pages/Image/edit.png'
// function BusList() {
//     const [Data, setData] = useState([]);

// 	async function getRecords() {
// 		const response = await fetch(`http://localhost:8000/bus/fetch/`);

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
// 	const onDeleteBus = async (id) => {
// 		if (window.confirm("Are you sure you want remove Bus")) {
// 			const response = await axios.delete(`http://localhost:8000/bus/delete/${id}`);
// 			if (response.status === 200) {
// 				console.log(response.data);
// 				getRecords();
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
// 								<div className="screen-home__recent-search">
// 									<div className="lable">
// 										<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
// 										<span className="text">Recent search</span>
// 									</div>
// 									<table className="styled-table">
// 										<div className="screen-home__rs-wrap">
// 											<ul className="screen-home__rs-row">
// 												<thead >
// 													<tr>
// 														<th >Bus Name</th>
// 														<th >Plate Number</th>
// 														<th >Bus Number</th>
// 														<th >Number of Seat</th>
// 														<th >Action</th>
// 													</tr>
// 												</thead>
// 											</ul></div>
// 										<tbody>
// 											{Data[0] ?
// 												<div className="screen-home__rs-wrap">
// 													<ul className="screen-home__rs-row">
// 														{Data.map((item, i) =>
// 															<>
// 																<tr key={item._id}>
// 																	<li className="screen-home__rs-col">
// 																		<td style={{ width: '13em' }}>
// 																			<div className="screen-homers-from-to">
// 																				<span>{item.busTitle}</span>
// 																			</div>
// 																		</td>
// 																		<td><div className="screen-homers-from-to">
// 																			<span>{item.plateNumber}</span>
// 																		</div>
// 																		</td>
// 																		<td>
// 																			<div className="screen-homers-from-to" style={{ marginLeft: '-2em' }}>
// 																				<span>{item.busNumber}</span>
// 																			</div>
// 																		</td>
// 																		<td>
// 																			<div className="screen-homers-from-to">
// 																				<span>{item.seatNumber}</span>
// 																			</div>
// 																		</td>
// 																		<td className='display-flex'>
// 																			<Link to={`/Admin/bus_reg/${item._id}`}>
// 																				<img style={{ width: '30px', height: '30px' }} src={Edit} alt="Cancel" />
// 																			</Link>
// 																			<img onClick={() => onDeleteBus(item._id)} style={{ width: '30px', height: '30px', cursor: 'pointer' }} src={Close} alt="Cancel" />
// 																			{/* <Link to={`/Admin/bus/view/${item._id}`}>
// 																				<img style={{ width: '30px', height: '30px' }} src={View} alt="Cancel" />
// 																			</Link> */}
// 																		</td>
// 																	</li>
// 																</tr>
// 															</>
// 														)}
// 													</ul>
// 												</div>
// 												: "Loading..."}
// 										</tbody>
// 									</table>
// 								</div>

// 							</div>

// 						</div>
// 					</section>
// 				</div>
// 			</main>
// 		</div>
// 	)
// }
// export default BusList