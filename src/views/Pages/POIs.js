import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DataTable, { defaultThemes } from 'react-data-table-component';
import Select from 'react-select';
import { axios_auth } from '../../api';
// react plugin used to create datetimepicker
import DatePicker from 'react-datepicker';

//CSV  import
import { CSVLink, CSVDownload } from 'react-csv';

import 'react-datepicker/dist/react-datepicker.css';
const PoiBaseURL = '/services/services/api';

const poiApiUrl = `${PoiBaseURL}/ese-pois`;
const userApiUrl = `${PoiBaseURL}/users`;
const wardsApiUrl = `${PoiBaseURL}/ese-wards?size=55`;

const columns = [
	{
		name: 'ID',
		selector: 'id',
		width: '80px',
		sortable: true,
	},
	{
		name: 'Holding Number',
		selector: 'holdingNo',
		width: '200px',
		sortable: true,
	},
	{
		name: 'Plot No',
		selector: 'plotNo',
		width: '180px',
		sortable: true,
	},
	{
		name: 'Ward',
		selector: 'eseWardWardDesc',
		sortable: true,
	},
	{
		name: 'Guardian Name',
		selector: 'guardianName',
		sortable: true,
		width: '180px',
	},
	{
		name: 'Address 1',
		selector: 'address1',
		sortable: true,
	},
	{
		name: 'Address 2',
		selector: 'address2',
		sortable: true,
	},
	{
		name: 'Address 3',
		selector: 'address3',
		sortable: true,
	},
	{
		name: 'Mobile',
		selector: 'mobileNo',
		sortable: true,
	},
	{
		name: 'Owner name',
		selector: 'ownerName',
		sortable: true,
	},
	{
		name: 'Landmark',
		selector: 'landMark',
		sortable: true,
	},
	{
		name: 'Latitude',
		selector: 'latitude',
		sortable: true,
	},
	{
		name: 'Longitude',
		selector: 'longitude',
		sortable: true,
	},
	{
		name: 'QR Code',
		selector: 'qrCode',
		sortable: true,
	},
	{
		name: 'RFID Code',
		selector: 'rfidCode',
		sortable: true,
	},
	{
		name: 'Additional details',
		selector: 'additionalDetails',
		sortable: true,
	},
	{
		name: 'Email',
		selector: 'email',
		sortable: true,
	},
	{
		name: 'Reason for follow up',
		selector: 'reasonForFollowUp',
		sortable: true,
	},
	{
		name: 'Notes',
		selector: 'notes',
		sortable: true,
	},
	{
		name: 'Pin code',
		selector: 'esePinCodePinCode',
		sortable: true,
	},
	{
		name: 'POI Type',
		selector: 'esePoiTypePoiTypeName',
		sortable: true,
	},
	{
		name: 'Property usage type',
		selector: 'esePoiPropertyUsageTypePropertyUsageTypeName',
		sortable: true,
	},
];

export const POIs = () => {
	const [pois, setPoisData] = useState({});
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState('id,asc');
	const [totalCount, setTotalCount] = useState(0);
	const [selectedUser, setSelectedUser] = React.useState(null);
	const [selectedWard, setSelectedWard] = React.useState(null);
	const [users, setUsers] = useState([]);
	const [wards, setWards] = useState([]);
	const [startDate, setStartDate] = useState();
	const [csv, setCsvData] = useState([]);
	const countPerPage = 40;

	// const csvData = [
	// 	['firstname', 'lastname', 'email'],
	// 	['Ahmed', 'Tomi', 'ah@smthing.co.com'],
	// 	['Raed', 'Labes', 'rl@smthing.co.com'],
	// 	['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
	// ];

	// Fetach all Pois data without any specific filter
	const fetchPoiData = async () => {
		axios_auth.get(poiApiUrl + createQueryParams()).then((res) => {
			setPoisData(res.data);
			console.log('print the data ===>', res.data);

			let arr = res.data;

			const csvHeading = Object.keys(arr[0]);

			let csvDataArr = [];
			csvDataArr.push(csvHeading);

			arr.map((obj) => {
				csvDataArr.push(Object.values(obj));
			});

			console.log('CSV data array', csvDataArr);
			setCsvData(csvDataArr);
		});
	};

	// Fetach all users for dropdown
	const getUsers = async () => {
		const res = await axios_auth.get(userApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) => usersList.push({ value: user.login, label: user.login }));
			setUsers(usersList);
		}
	};

	// Fetch all wards number for dropdown
	const getWards = async () => {
		const res = await axios_auth.get(wardsApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) => usersList.push({ value: user.id, label: user.wardDesc }));
			setWards(usersList);
		}
	};

	const fetchPoiTotalCount = async () => {
		axios_auth.get(poiApiUrl + `/count` + createQueryParams()).then((res) => {
			console.log(res);
			setTotalCount(res.data);
		});
	};

	const createQueryParams = () => {
		let params = '?';
		if (selectedUser && selectedUser.value) params += `createdBy.equals=${selectedUser.value}&`;
		if (selectedWard && selectedWard.value) params += `eseWardId.equals=${selectedWard.value}&`;
		params += `page=${page}&size=${countPerPage}&sort=${sort}`;
		return params;
	};

	useEffect(() => {
		// console.log(startDate);
		console.log(pois);
	}, [startDate]);

	useEffect(() => {
		getUsers();
		getWards();
	}, []);

	// Used to re-call the POI API whenever user or ward is changed by creating query parameter
	useEffect(() => {
		setPage(1);
	}, [selectedWard, selectedUser]);

	useEffect(async () => {
		await fetchPoiData();
		fetchPoiTotalCount();
	}, [page]);

	useEffect(() => {
		fetchPoiTotalCount();
		fetchPoiData();
	}, [sort]);

	const onSort = (column, sortDirection, event) => {
		console.log(column, sortDirection, event);
		setSort(column.selector + ',' + sortDirection);
	};

	const customStyles = {
		header: {
			style: {
				minHeight: '56px',
			},
		},
		headRow: {
			style: {
				borderTopStyle: 'solid',
				borderTopWidth: '1px',
				borderTopColor: defaultThemes.default.divider.default,
			},
		},
		headCells: {
			style: {
				'&:not(:last-of-type)': {
					borderRightStyle: 'solid',
					borderRightWidth: '1px',
					borderRightColor: defaultThemes.default.divider.default,
					fontSize: 13,
				},
			},
		},
	};

	return (
		<div className='d-flex flex-column' style={{ height: 'calc(100vh - 185px)' }}>
			<div className='row'>
				<Col className='co-sm-3 form-group'>
					<div className='d-flex align-items-center'>
						<label htmlFor='selectedUser' className='mb-0 mr-3'>
							By User
						</label>
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
					<div className='d-flex align-items-center'>
						<label htmlFor='wards' className='mb-0 mr-3'>
							By Ward
						</label>
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
					<div className='d-flex align-items-center form-group'>
						<label htmlFor='data' className='mb-0 mr-3'>
							By Date
						</label>
						<DatePicker
							className='form-control'
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							isClearable
							placeholderText='Select date'
						/>
					</div>
				</Col>
			</div>
			<CSVLink data={csv}>Download CSV</CSVLink>
			<DataTable
				columns={columns}
				data={pois}
				striped={true}
				dense={false}
				highlightOnHover
				fixedHeader={true}
				customStyles={customStyles}
				pagination
				paginationServer
				paginationTotalRows={totalCount - 1}
				paginationResetDefaultPage={true}
				paginationPerPage={countPerPage}
				paginationComponentOptions={{
					noRowsPerPage: true,
				}}
				onChangePage={(page) => setPage(page)}
				// sortServer={true}
				onSort={onSort}
			/>
		</div>
	);
};
