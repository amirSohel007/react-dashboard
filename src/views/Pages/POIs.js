import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
import { AgGridReact } from 'ag-grid-react';
import Select from 'react-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export const POIs = () => {
  const [poisData, setPoisData] = useState();
  const [singleSelect, setSingleSelect] = React.useState('');
  const [users, setUsers] = useState([]);

    // GET POIs Users
	const getUsers = async () => {
		const res = await axios_auth.get('/services/services/api/users');
		if (res.data) {
			let usersList = [];
			res.data.map((user) => usersList.push({value:user.login, label:user.login}));
			setUsers(usersList);
		}
  };

	const fetchPoisData = async (params = null) => {
    let url = '/services/services/api/ese-pois';
    if (params) url += `?${params}`;
		const res = await axios_auth.get(url);
		if (res.data) {
			setPoisData(res.data);
		} else {
			alert('Error fetching data');
		}
	};

  const fetchUserSpecificPois = (user) => {
    setSingleSelect(user);
    let params = `createdBy.equals=${user.value}`
    fetchPoisData(params);
  }

	useEffect(() => {
    fetchPoisData();
    getUsers();
	}, []);

	const action = (e) => {
		console.log('action executed', e);
	};

	const columnDefs = [
		{
			headerName: 'ID',
			field: 'id',
			width: '100px',
		},
		{
			headerName: 'Holding Number',
			field: 'holdingNo',
			width: '180px',
		},
		{
			headerName: 'Plot No',
			field: 'plotNo',
			width: '180px',
		},
		{
			headerName: 'Ward',
			field: 'eseWardWardDesc',
		},
		{
			headerName: 'Guardian Name',
			field: 'guardianName',
		},
		{
			headerName: 'Address 1',
			field: 'address1',
		},
		{
			headerName: 'Address 2',
			field: 'address2',
		},
		{
			headerName: 'Address 3',
			field: 'address3',
		},
		{
			headerName: 'Mobile',
			field: 'mobileNo',
		},
		{
			headerName: 'Owner name',
			field: 'ownerName',
		},
		{
			headerName: 'Landmark',
			field: 'landMark',
		},
		{
			headerName: 'Latitude',
			field: 'latitude',
		},
		{
			headerName: 'Longitude',
			field: 'longitude',
		},
		{
			headerName: 'QR Code',
			field: 'qrCode',
		},
		{
			headerName: 'RFID Code',
			field: 'rfidCode',
		},
		{
			headerName: 'Additional details',
			field: 'additionalDetails',
		},
		{
			headerName: 'Email',
			field: 'email',
		},
		{
			headerName: 'Reason for follow up',
			field: 'reasonForFollowUp',
		},
		{
			headerName: 'Notes',
			field: 'notes',
		},
		{
			headerName: 'Pin code',
			field: 'esePinCodePinCode',
		},
		{
			headerName: 'POI Type',
			field: 'esePoiTypePoiTypeName',
		},
		{
			headerName: 'Property usage type',
			field: 'esePoiPropertyUsageTypePropertyUsageTypeName',
		},
		{
			headerName: 'Actions',
			cellRendererFramework: function (params) {
				return (
					<span>
						<i
							className='fa fa-eye pr-4'
							onClick={() => action(params.data)}
						></i>
						<i className='fa fa-pen pr-4' onClick={() => action('edit')}></i>
						<i
							className='fa fa-trash pr-4'
							onClick={() => action('delete')}
						></i>
					</span>
				);
			},
		},
	];

	return (
    <div className="d-flex flex-column" style={{height: 'calc(100vh - 185px)'}}>
     <Row>
       <Col className="co-sm-6">
       <Select
									className='react-select primary'
									classNamePrefix='react-select'
									name='singleSelect'
									value={singleSelect}
									onChange={(value) => fetchUserSpecificPois(value)}
									options={users}
									placeholder='Single Select'
								/>
       </Col>

       <Col className="co-sm-6">
        next dropdown here
       </Col>
     </Row>
      	<div className='ag-theme-alpine' style={{ flex:'auto', width: '100%' }}>
			<AgGridReact columnDefs={columnDefs} rowData={poisData}></AgGridReact>
		</div>
    </div>
	
	);
};
