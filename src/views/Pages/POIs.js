import React, { useEffect, useState } from 'react';
import { axios_auth } from '../../api';
import {
	Badge,
	Button,
	Card,
	Form,
	InputGroup,
	Navbar,
	Nav,
	Table,
	OverlayTrigger,
	Tooltip,
	Container,
	Row,
	Col,
  } from "react-bootstrap";
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
	<div>
		<Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">POIs</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width">
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Holding No</th>
                      <th>Plot No</th>
                      <th>Owner Name</th>
                      <th>Guardian Name</th>
                      <th>Mobile No</th>
                      <th>Address 1</th>
                      <th>Address 2</th>
                      <th>Address 3</th>
                      <th>Ward</th>
                      <th>Landmark</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>QR Code</th>
                      <th>RFID Code</th>
                      <th>Additional Detail</th>
                      <th>Email</th>
                      <th>Reason for followup</th>
                      <th>Notes</th>
                      <th>Pin Code</th>
                      <th>POI Type</th>
                      <th>POI Property</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
					  {
						  poisData && poisData.length > 0 &&
						  	poisData.map((poi, index) => {
								return (<tr>
                      				<td>{poi.id}</td>
                      				<td>{poi.holdingNo}</td>
                      				<td>{poi.plotNo}</td>
                      				<td>{poi.ownerName}</td>
                      				<td>{poi.guardianName}</td>
                      				<td>{poi.mobileNo}</td>
                      				<td>{poi.address1}</td>
                      				<td>{poi.address2}</td>
                      				<td>{poi.address3}</td>
                      				<td>{poi.eseWardWardDesc}</td>
                      				<td>{poi.landMark}</td>
                      				<td>{poi.latitude}</td>
                      				<td>{poi.longitude}</td>
                      				<td>{poi.qrCode}</td>
                      				<td>{poi.rfidCode}</td>
                      				<td>{poi.additionalDetails}</td>
                      				<td>{poi.email}</td>
                      				<td>{poi.reasonForFollowUp}</td>
                      				<td>{poi.notes}</td>
                      				<td>{poi.esePinCodePinCode}</td>
                      				<td>{poi.esePoiTypePoiTypeName}</td>
                      				<td>{poi.esePoiPropertyUsageTypePropertyUsageTypeName}</td>
									  <td className="td-actions text-right">
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-48903503">
                              View Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="info"
                          >
                            <i className="fas fa-user"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-981231696">
                              Edit Profile..
                            </Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="success"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          overlay={
                            <Tooltip id="tooltip-255158527">Remove..</Tooltip>
                          }
                        >
                          <Button
                            className="btn-link btn-xs"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            variant="danger"
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
								</tr>)
							  })
					  }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
	</div>
	)
};
