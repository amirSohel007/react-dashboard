import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
import Table from '../../components/ReactTable/ReactTable'


export const POIs = () => {
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
    poisData && poisData.length > 0 ? <Table columns={[
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Holding number",
        accessor: "holdingNo"
      },
      {
        Header: "plotNo",
        accessor: "plotNo"
      },
      {
        Header: "eseWardWardDesc",
        accessor: "eseWardWardDesc"
      },
      {
        Header: "guardianName",
        accessor: "guardianName"
      },
      {
        Header: "address1",
        accessor: "address1"
      },
      {
        Header: "address2",
        accessor: "address2"
      },
      {
        Header: "Mobile",
        accessor: "mobileNo"
      },
      {
        Header: "Owner name",
        accessor: "ownerName"
      },
      {
        Header: "landMark",
        accessor: "landMark"
      },
      {
        Header: "latitude",
        accessor: "latitude"
      },
      {
        Header: "longitude",
        accessor: "longitude"
      },
      {
        Header: "qrCode",
        accessor: "qrCode"
      },
      {
        Header: "rfidCode",
        accessor: "rfidCode"
      },
      {
        Header: "additionalDetails",
        accessor: "additionalDetails"
      },
      {
        Header: "email",
        accessor: "email"
      },
      {
        Header: "reasonForFollowUp",
        accessor: "reasonForFollowUp"
      },
      {
        Header: "notes",
        accessor: "notes"
      },
      {
        Header: "esePinCodePinCode",
        accessor: "esePinCodePinCode"
      },
      {
        Header: "esePoiTypePoiTypeName",
        accessor: "esePoiTypePoiTypeName"
      },
      {
        Header: "esePoiPropertyUsageTypePropertyUsageTypeName",
        accessor: "esePoiPropertyUsageTypePropertyUsageTypeName"
      }
    ]}

      data={poisData}
    /> : <div></div>
  )
};
