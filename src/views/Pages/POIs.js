import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
import { AgGridReact } from 'ag-grid-react';
import Select from 'react-select';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {
	Row,
	Col,
} from 'react-bootstrap';

export const POIs = () => {
	const [poisData, setPoisData] = useState();
	const [selectedUser, setSelectedUser] = React.useState(null);
	const [selectedWard, setSelectedWard] = React.useState(null);
	const [users, setUsers] = useState([]);
	const [wards, setWards] = useState([]);

	const poiApiUrl = '/services/services/api/ese-pois'
	const userApiUrl = '/services/services/api/users';
	const wardsApiUrl = '/services/services/api/ese-wards';

	// GET POIs Users
	const getUsers = async () => {
		const res = await axios_auth.get(userApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) =>
				usersList.push({ value: user.login, label: user.login })
			);
			setUsers(usersList);
		}
	};

	// GET ALL WARDS
	const getWards = async () => {
		const res = await axios_auth.get(wardsApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) =>
				usersList.push({ value: user.id, label: user.wardDesc })
			);
			setWards(usersList);
		}
	};

	// GET ALL POIs
	const fetchPoisData = async (queryparams = null) => {
		let url = poiApiUrl;
		if (queryparams) url += queryparams; // Appending query params

		const res = await axios_auth.get(url);
		if (res.data) {
			setPoisData(res.data);
		} else {
			alert('Error fetching data');
		}
	};

	useEffect(() => {
		fetchPoisData();
		getUsers();
		getWards();
	}, []);

	// Used to re-call the POI API whenever user or ward is changed by creating query parameter
	useEffect(() => {
		let queryparams = '?';
		if (selectedUser && selectedUser.value) queryparams += `createdBy.equals=${selectedUser.value}&`;
		if (selectedWard && selectedWard.value) queryparams += `eseWardId.equals=${selectedWard.value}&`;

		fetchPoisData(queryparams);
	}, [selectedWard, selectedUser]);

	const action = (e) => {
		console.log('action executed', e);
	};

	const columnDefs = [
		{
			headerName: 'ID',
			field: 'id',
			width: '100px',
			sortable: true,
		},
		{
			headerName: 'Holding Number',
			field: 'holdingNo',
			width: '180px',
			sortable: true,
		},
		{
			headerName: 'Plot No',
			field: 'plotNo',
			width: '180px',
			sortable: true,
		},
		{
			headerName: 'Ward',
			field: 'eseWardWardDesc',
			sortable: true,
		},
		{
			headerName: 'Guardian Name',
			field: 'guardianName',
			sortable: true,
		},
		{
			headerName: 'Address 1',
			field: 'address1',
			sortable: true,
		},
		{
			headerName: 'Address 2',
			field: 'address2',
			sortable: true,
		},
		{
			headerName: 'Address 3',
			field: 'address3',
			sortable: true,
		},
		{
			headerName: 'Mobile',
			field: 'mobileNo',
			sortable: true,
		},
		{
			headerName: 'Owner name',
			field: 'ownerName',
			sortable: true,
		},
		{
			headerName: 'Landmark',
			field: 'landMark',
			sortable: true,
		},
		{
			headerName: 'Latitude',
			field: 'latitude',
			sortable: true,
		},
		{
			headerName: 'Longitude',
			field: 'longitude',
			sortable: true,
		},
		{
			headerName: 'QR Code',
			field: 'qrCode',
			sortable: true,
		},
		{
			headerName: 'RFID Code',
			field: 'rfidCode',
			sortable: true,
		},
		{
			headerName: 'Additional details',
			field: 'additionalDetails',
			sortable: true,
		},
		{
			headerName: 'Email',
			field: 'email',
			sortable: true,
		},
		{
			headerName: 'Reason for follow up',
			field: 'reasonForFollowUp',
			sortable: true,
		},
		{
			headerName: 'Notes',
			field: 'notes',
			sortable: true,
		},
		{
			headerName: 'Pin code',
			field: 'esePinCodePinCode',
			sortable: true,
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
		<div
			className='d-flex flex-column'
			style={{ height: 'calc(100vh - 185px)' }}
		>
			<Row>
				<Col className='co-sm-3 form-group'>
					<div className="d-flex align-items-center">
					<label htmlFor="selectedUser" className="mb-0 mr-3">By User</label>
					<Select
						className='react-select primary flex-fill'
						classNamePrefix='react-select'
						name='selectedUser'
						value={selectedUser}
						onChange={(value) => setSelectedUser(value)}
						options={users}
						placeholder='Single Select'
					/>
					</div>
				</Col>

				<Col className='co-sm-3 form-group'>
					<div className="d-flex align-items-center">
					<label htmlFor="wards" className="mb-0 mr-3">By Ward</label>
					<Select
						className='react-select primary flex-fill'
						classNamePrefix='react-select'
						name='wards'
						value={selectedWard}
						onChange={(value) => setSelectedWard(value)}
						options={wards}
					/>
					</div>
				</Col>

				<Col className='co-sm-3'>

				</Col>
				<Col className='co-sm-3'>

				</Col>
			</Row>
			<div className='ag-theme-alpine' style={{ flex: 'auto', width: '100%' }}>
				<AgGridReact
					pagination={true}
					animateRows={true}
					columnDefs={columnDefs}
					rowData={poisData}
					 paginationPageSize="60"
				></AgGridReact>
			</div>
		</div>
	);
};
