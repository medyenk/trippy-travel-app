import React, { useState, useEffect } from 'react';
import AddTripForm from '../Components/AddTripForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/Timeline.css'

function Timeline() {
  const [userId, setUserId] = useState(jwt_decode(localStorage.usertoken).identity.user_id);
  const [modal, setModal] = useState(false);
  const [userTripData, setUserTripData] = useState([])
  
  const getUserData = () => {
    Axios(`/user/trip/${userId}`)
    .then(response => {
    setUserTripData(response.data);
    })
    .catch(error => {
          console.log("this is error", error.message);
    });
  }

  const toggleAddTripModal = () => {
    setModal(!modal)
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteTrip = (id) => {
    if (window.confirm("Are you sure you want to delete it forever") === true) {
      Axios.delete(`/trip/${id}`)
        .then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error);
        }).then(window.location.reload(false));
    }
  };
  
  return (
    <div className="timeline-container">
      <Container className="add-trip-area">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1>Add Your Latest Trip </h1>
          </Col>
          <Col md={4}>
            <Button variant="dark" onClick={toggleAddTripModal}>Add Trip</Button>
          </Col>
        </Row>
        <div className="modal">
          <Modal isOpen={modal} toggle={toggleAddTripModal}>
            <ModalHeader toggle={toggleAddTripModal}>Add a Trip:</ModalHeader>
            <ModalBody>
              <AddTripForm togglefunction={toggleAddTripModal} />
            </ModalBody>
          </Modal>
        </div>
      </Container>
      <div className="trip-container">
        {userTripData ? userTripData.reverse().map((trip) => (
          <div key={trip.id} className="user-trip">
            <div className="button-area">
              <Button variant="dark" onClick={() => deleteTrip(trip.id)}>X</Button>
            </div>
            <div className="trip-area">
            <Container style={{padding: 20, borderRadius: 1}}>
              <Row>
                <Col>
                      <h4>{trip.trip_country}</h4>
                      <p>{trip.trip_bio}</p>
                      {trip.date_created.split('T')[0].split('-').reverse().join('/')}
                </Col>
                <Col>
                  <div className="trip-images">
                    <img width="10px" height="10px" src={require("../images/" + trip.trip_image)} id="trip-image"/>  
                  </div>
                </Col>
              </Row>
            </Container>
            
              
            </div>
          </div>     

            )) : "Please enter your travel journey"}
          </div> 
      </div>
  );
}

export default Timeline;
