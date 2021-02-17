import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
// import Table from '../../components/ReactTable/ReactTable'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const POIs = () => {

	const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Ford", model: "Mondeo", price: 32000 }, 
		{ make: "Ford", model: "Mondeo", price: 32000 }, 
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Porsche", model: "Boxter", price: 72000 },
		{ make: "Toyota", model: "Celica", price: 35000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Ford", model: "Mondeo", price: 32000 },
		{ make: "Ford", model: "Mondeo", price: 32000 }, 
		{ make: "Ford", model: "Mondeo", price: 32000 }, 
		{ make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
    ]);





  const [poisData, setPoisData] = useState();
  const fetchPoisData = async () => {
    const res = await axios_auth.get('/services/services/api/ese-pois');
    console.log('fetchPoisData -> res', res.data);
    if (res.data) {
      setPoisData(res.data);
    }
    else {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchPoisData();
  }, []);

  return (
    // poisData && poisData.length > 0 ? <Table columns={[
    //   {
    //     Header: "ID",
    //     accessor: "id"
    //   },
    //   {
    //     Header: "Holding number",
    //     accessor: "holdingNo"
    //   },
    //   {
    //     Header: "plotNo",
    //     accessor: "plotNo"
    //   },
    //   {
    //     Header: "eseWardWardDesc",
    //     accessor: "eseWardWardDesc"
    //   },
    //   {
    //     Header: "guardianName",
    //     accessor: "guardianName"
    //   },
    //   {
    //     Header: "address1",
    //     accessor: "address1"
    //   },
    //   {
    //     Header: "address2",
    //     accessor: "address2"
    //   },
    //   {
    //     Header: "Mobile",
    //     accessor: "mobileNo"
    //   },
    //   {
    //     Header: "Owner name",
    //     accessor: "ownerName"
    //   },
    //   {
    //     Header: "landMark",
    //     accessor: "landMark"
    //   },
    //   {
    //     Header: "latitude",
    //     accessor: "latitude"
    //   },
    //   {
    //     Header: "longitude",
    //     accessor: "longitude"
    //   },
    //   {
    //     Header: "qrCode",
    //     accessor: "qrCode"
    //   },
    //   {
    //     Header: "rfidCode",
    //     accessor: "rfidCode"
    //   },
    //   {
    //     Header: "additionalDetails",
    //     accessor: "additionalDetails"
    //   },
    //   {
    //     Header: "email",
    //     accessor: "email"
    //   },
    //   {
    //     Header: "reasonForFollowUp",
    //     accessor: "reasonForFollowUp"
    //   },
    //   {
    //     Header: "notes",
    //     accessor: "notes"
    //   },
    //   {
    //     Header: "esePinCodePinCode",
    //     accessor: "esePinCodePinCode"
    //   },
    //   {
    //     Header: "esePoiTypePoiTypeName",
    //     accessor: "esePoiTypePoiTypeName"
    //   },
    //   {
    //     Header: "esePoiPropertyUsageTypePropertyUsageTypeName",
    //     accessor: "esePoiPropertyUsageTypePropertyUsageTypeName"
    //   }
    // ]}

    //   data={poisData}
	// /> : <div></div>
	
	 <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
				<AgGridColumn field="make"></AgGridColumn>
                <AgGridColumn field="model"></AgGridColumn>
                <AgGridColumn field="price"></AgGridColumn>
            </AgGridReact>
        </div>
  )
};
