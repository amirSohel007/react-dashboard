import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

//CSV  import
import { CSVLink } from 'react-csv';
import { customStyles, basicsColumn, dateConvertor } from '../Pages-util/POIs-util';
import DataTable from 'react-data-table-component';
// react plugin used to create datetimepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { axios_auth } from '../../api';

// BASE ENDPOINT URL FOR ALL DIFFERENT REQUEST
const PoiBaseURL = '/services/services/api';

const poiApiUrl = `${PoiBaseURL}/ese-pois`;
const userApiUrl = `${PoiBaseURL}/users`;
const wardsApiUrl = `${PoiBaseURL}/ese-wards?size=55`;

const actionClicked = (e) => {
	console.log(e);
};

// BASIC TABLE COLUMN
const columns = [
	...basicsColumn,
	{
		name: 'Actions',
		cell: (row, index, column, id) => {
			return (
				<span>
					<i className='fa fa-eye pr-4' onClick={() => actionClicked('view')}></i>
					<i className='fa fa-pen pr-4' onClick={() => actionClicked('edit')}></i>
					<i className='fa fa-trash pr-4' onClick={() => actionClicked('delete')}></i>
				</span>
			);
		},
	},
];

export const POIs = () => {
	const defaultPage = 0;
	const [pois, setPoisData] = useState({});
	const [page, setPage] = useState(defaultPage);
	const [sort, setSort] = useState('id,asc');
	const [totalCount, setTotalCount] = useState(0);
	const [selectedUser, setSelectedUser] = React.useState(null);
	const [selectedWard, setSelectedWard] = React.useState(null);
	const [users, setUsers] = useState([]);
	const [wards, setWards] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const [isLoading, setLoading] = useState(false);
	const [csv, setCsvData] = useState([]);
	const [initialCSVLoad, setInitialCSVLoad] = useState(false);
	const countPerPage = 40;

	//Fetch pois count and data with respective filters and pagination
	const fetchPoiData = async () => {
		setLoading(true);
		let queryParams = await createQueryParams();
		fetchPoiTotalCount(queryParams).then((count) => {
			setTotalCount(count);
			axios_auth.get(poiApiUrl + queryParams).then((res) => {
				setPoisData(res.data);
				if (initialCSVLoad) {
					debugger;
					setCsvData(res?.data);
				}
				setLoading(false);
			});
		});
	};

	// NETWORK CALL TO GET ALL DROPDOWN USERS
	const getUsers = async () => {
		const res = await axios_auth.get(userApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) => usersList.push({ value: user.login, label: user.login }));
			setUsers(usersList);
		}
	};

	// DOWNLOAD CSV  FILE
	const downloadCSV = () => {
		axios_auth.get(`${poiApiUrl}?size=914`).then((res) => {
			if (res.data?.length > 0) {
				// WE ARE MAKING THIS FLAG TRUE ON INITIAL LEVEL
				setInitialCSVLoad(true);
				setCsvData(res.data);
			}
		});
	};

	// NETWORK CALL FOR GET ALL WARDS FOR DROPDOWN
	const getWards = async () => {
		const res = await axios_auth.get(wardsApiUrl);
		if (res.data) {
			let usersList = [];
			res.data.map((user) => usersList.push({ value: user.id, label: user.wardDesc }));
			setWards(usersList);
		}
	};

	// 	GET ALL COUNT
	const fetchPoiTotalCount = async (queryParams) => {
		return new Promise((resolve, reject) => {
			axios_auth.get(poiApiUrl + `/count` + queryParams).then((res) => {
				resolve(res.data);
			});
		});
	};

	// 	HELPER FUNCTION FOR CREATE QUERY PARMAS
	const createQueryParams = async () => {
		return new Promise((resolve, reject) => {
			let params = '?';
			if (selectedUser?.value) params += `createdBy.equals=${selectedUser.value}&`;
			if (selectedWard?.value) params += `eseWardId.equals=${selectedWard.value}&`;
			if (startDate) {
				params += `createdDate.equals=${dateConvertor(startDate)}T11:20:47.357Z&`; // let the time be constant here
			}
			params += `page=${page}&size=${countPerPage}&sort=${sort}`;
			resolve(params);
		});
	};

	// ON SORT
	const onSort = (column, sortDirection, event) => {
		setSort(column.selector + ',' + sortDirection);
	};

	// INITIAL MOUNT GET ALL DATA (THIS HOOK TRIGGERD ONLY ONCE)
	useEffect(() => {
		getUsers();
		getWards();
		downloadCSV();
	}, []);

	useEffect(() => {
		fetchPoiData();
	}, [resetPaginationToggle]);

	// re fetching data whenever page, sort or start date changes
	useEffect(() => {
		fetchPoiData();
	}, [page, sort, startDate]);

	// Used to re-call the POI API whenever user or ward is changed by creating query parameter
	useEffect(() => {
		setPage(defaultPage);
		setResetPaginationToggle(!resetPaginationToggle); // reseting pagination current page to 1
	}, [selectedWard, selectedUser]);

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
							isClearable
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
							isClearable
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

			<div className='d-flex justify-content-end'>
				{csv && csv.length > 0 && (
					<CSVLink className='export_csv' data={csv}>
						Download CSV
					</CSVLink>
				)}
			</div>

			<DataTable
				striped
				dense
				pagination
				paginationServer
				highlightOnHover
				fixedHeader
				columns={columns}
				data={pois}
				customStyles={customStyles}
				progressPending={isLoading}
				paginationTotalRows={totalCount}
				paginationResetDefaultPage={resetPaginationToggle}
				paginationPerPage={countPerPage}
				paginationComponentOptions={{
					noRowsPerPage: true,
				}}
				onChangePage={(page) => setPage(page - 1)}
				onSort={onSort}
			/>
		</div>
	);
};
