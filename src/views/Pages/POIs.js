import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
// import Table from '../../components/ReactTable/ReactTable'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const POIs = () => {
  const [poisData, setPoisData] = useState();
  const fetchPoisData = async () => {
    const res = await axios_auth.get('/services/services/api/ese-pois');
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

  const action = (e) => {
    console.log("action executed", e);
  }

  const columnDefs = [
      {
        headerName: "ID",
        field: "id",
        width: "100px",
        sortable: true
      },
      {
        headerName: "Holding Number",
        field: "holdingNo",
        width: "180px",
        sortable: true
      },
      {
        headerName: "Plot No",
        field: "plotNo",
        width: "180px",
        sortable: true
      },
      {
        headerName: "Ward",
        field: "eseWardWardDesc",
        sortable: true
      },
      {
        headerName: "Guardian Name",
        field: "guardianName",
        sortable: true
      },
      {
        headerName: "Address 1",
        field: "address1",
        sortable: true
      },
      {
        headerName: "Address 2",
        field: "address2",
        sortable: true
      },
      {
        headerName: "Address 3",
        field: "address3",
        sortable: true
      },
      {
        headerName: "Mobile",
        field: "mobileNo",
        sortable: true
      },
      {
        headerName: "Owner name",
        field: "ownerName",
        sortable: true
      },
      {
        headerName: "Landmark",
        field: "landMark",
        sortable: true
      },
      {
        headerName: "Latitude",
        field: "latitude",
        sortable: true
      },
      {
        headerName: "Longitude",
        field: "longitude",
        sortable: true
      },
      {
        headerName: "QR Code",
        field: "qrCode",
        sortable: true
      },
      {
        headerName: "RFID Code",
        field: "rfidCode",
        sortable: true
      },
      {
        headerName: "Additional details",
        field: "additionalDetails",
        sortable: true
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true
      },
      {
        headerName: "Reason for follow up",
        field: "reasonForFollowUp",
        sortable: true
      },
      {
        headerName: "Notes",
        field: "notes",
        sortable: true
      },
      {
        headerName: "Pin code",
        field: "esePinCodePinCode",
        sortable: true
      },
      {
        headerName: "POI Type",
        field: "esePoiTypePoiTypeName",
        sortable: true
      },
      {
        headerName: "Property usage type",
        field: "esePoiPropertyUsageTypePropertyUsageTypeName",
        sortable: true
      },
      {
        headerName: "Actions",
        cellRendererFramework: function(params) {
          return <span>
                  <i className="fa fa-eye pr-4" onClick={() => action(params.data) }></i>
                  <i className="fa fa-pen pr-4" onClick={() => action("edit") }></i>
                  <i className="fa fa-trash pr-4" onClick={() => action("delete") }></i>
                </span>
        }
      }
    ]
  

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact columnDefs={columnDefs}
        rowData={poisData}>
      </AgGridReact>
    </div>
  )
};
