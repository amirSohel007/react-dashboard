import { defaultThemes } from 'react-data-table-component';
export const customStyles = {
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

export const basicsColumn = [
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
