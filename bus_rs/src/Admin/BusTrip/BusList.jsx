import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./table.scss";
import axios from 'axios';
import Close from '../../pages/Image/closes.png';
// import View from '../../pages/Image/view.jfif'
import Edit from '../../pages/Image/edit.png'
function BusList() {
    const [Data, setData] = useState([]);

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
		getRecords();
	})
	const onDeleteBus = async (id) => {
		if (window.confirm("Are you sure you want remove Bus")) {
			const response = await axios.delete(`http://localhost:8000/bus/delete/${id}`);
			if (response.status === 200) {
				console.log(response.data);
				getRecords();
			}
		}
	}

	return (
		<div className="main">
			<main className="app">
				<div className="screen-wrap">
					<section className="screen-home">
						<div className="screen-home__form-wrap">
							<div className="screen-home__form">
								<div className="screen-home__recent-search">
									<div className="lable">
										<figure className="icon"><img src="https://i.ibb.co/dM8cwj6/recent-search.png" alt='btn' /></figure>
										<span className="text">Recent search</span>
									</div>
									<table className="styled-table">
										<div className="screen-home__rs-wrap">
											<ul className="screen-home__rs-row">
												<thead >
													<tr>
														<th >Bus Name</th>
														<th >Plate Number</th>
														<th >Bus Number</th>
														<th >Number of Seat</th>
														<th >Action</th>
													</tr>
												</thead>
											</ul></div>
										<tbody>
											{Data[0] ?
												<div className="screen-home__rs-wrap">
													<ul className="screen-home__rs-row">
														{Data.map((item, i) =>
															<>
																<tr key={item._id}>
																	<li className="screen-home__rs-col">
																		<td style={{ width: '13em' }}>
																			<div className="screen-homers-from-to">
																				<span>{item.busTitle}</span>
																			</div>
																		</td>
																		<td><div className="screen-homers-from-to">
																			<span>{item.plateNumber}</span>
																		</div>
																		</td>
																		<td>
																			<div className="screen-homers-from-to" style={{ marginLeft: '-2em' }}>
																				<span>{item.busNumber}</span>
																			</div>
																		</td>
																		<td>
																			<div className="screen-homers-from-to">
																				<span>{item.seatNumber}</span>
																			</div>
																		</td>
																		<td className='display-flex'>
																			<Link to={`/Admin/bus_reg/${item._id}`}>
																				<img style={{ width: '30px', height: '30px' }} src={Edit} alt="Cancel" />
																			</Link>
																			<img onClick={() => onDeleteBus(item._id)} style={{ width: '30px', height: '30px', cursor: 'pointer' }} src={Close} alt="Cancel" />
																			{/* <Link to={`/Admin/bus/view/${item._id}`}>
																				<img style={{ width: '30px', height: '30px' }} src={View} alt="Cancel" />
																			</Link> */}
																		</td>
																	</li>
																</tr>
															</>
														)}
													</ul>
												</div>
												: "Loading..."}
										</tbody>
									</table>
								</div>

							</div>

						</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default BusList