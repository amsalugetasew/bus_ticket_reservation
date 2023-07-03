// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap'

function UserList() {
    const [Data, setData] = useState([]);
    const [
        // Delete, 
        setDelete] = useState(false)
    const [RowData, setRowData] = useState([]);
    const [User, setUser] = useState({
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        password: ""
    });
    const [id, setId] = useState("");
    // View User Data
    const [ViewShow, setViewShow] = useState([]);
    const handleViewShow = () => { setViewShow(true) }
    const handleViewClose = () => { setViewShow(false) }

    // Edit User Data
    const [Edit, setEdit] = useState([]);
    const handleEdit = () => {
         setEdit(true) 
        const url =`http://localhost:8000/users/edit/${id}`;
        const cred = {User}
        axios.put(url, cred).then(res=>{
            const result = res.data;
            console.log(result)
            const {status, message} = result;
            if (status !== 'Success'){
                alert(message, status);
            }
            else{
                alert(message);
                window.location.reload();
            }
        }).catch(err=>{
            console.log(err);
        })
        }
    const handleEditClose = () => { 
        // axios.post('http://localhost:8000/users/add', newPerson)
        //     .then(res => console.log(res.data));
        setEdit(false) 
    }


    



    // async function deleteRecord(id) {
    //     await fetch(`http://localhost:8000/users/delete/${id}`, {
    //       method: "DELETE"
    //     });
    
    //     const newRecords = records.filter((el) => el._id !== id);
    //     setRecords(newRecords);
    //     // console.log(newRecords)
    //   }




    async function getRecords() {
        const response = await fetch(`http://localhost:8000/users/fetch/`);

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


    // async function handleDelete  (id) { 
    //     // setDelete(true)
    //     await fetch(`http://localhost:8000/users/delete/${id}`, {
    //       method: "DELETE"
    //     });
    
    //     const newRecords = Data.filter((el) => el._id !== id);
    //     setData(newRecords);        
    // }
    // const handleDeleteClose = () => { setDelete(false) }
    return (
        <div>
            <div className='row'>
                <div className="mt-5 mb-4">
                    <Button variant='primary'><i className='fa fa-close'></i><Link to='/Signup'>Add New User</Link></Button>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-striped table-hower table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(setRowData(item)) }}>View</Button>
                                        <Button size='sm' variant='warning' onClick={() => { handleEdit(setRowData(item), setId(item._id)) }}>Edit</Button>
                                        <Button size='sm' variant='danger' onClick={() => { handleViewShow(setRowData(item), setId(item._id), setDelete(true)) }}>Delete</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-box-view">
                <Modal show={ViewShow} onHide={handleViewClose} backdrop="static" keyboard="false">
                    <Modal.Header closeButton><Modal.Title>View User</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={RowData.firstName} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={RowData.lastName} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={RowData.email} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={RowData.role} readOnly />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="modal-box-view">
                <Modal show={Edit} onHide={handleEditClose} backdrop="static" keyboard="false">
                    <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
                    <Modal.Body>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={(e)=>setUser(e.target.value)} 
                                defaultValue={RowData.firstName}
                                // value={RowData.firstName} readOnly 
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={(e)=>setUser(e.target.value)} 
                                defaultValue={RowData.lastName}

                                // value={RowData.lastName} readOnly 
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={(e)=>setUser(e.target.value)} 
                                defaultValue={RowData.email}
                                // value={RowData.email} readOnly 
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" onClick={(e)=>setUser(e.target.value)} 
                                defaultValue={RowData.role}
                                // value={RowData.role} readOnly 
                                />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleEdit}> Add User</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default UserList