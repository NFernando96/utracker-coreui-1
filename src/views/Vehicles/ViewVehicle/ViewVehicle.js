import React, {useEffect,useState} from 'react';
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
import axios from 'axios';
import Message from "../../Required Sample Pages/Message";




export default function ViewVehicle (props) {


  const [vehicles, setVehicles] = useState([]);
  const [vehicleNumber1, setVehicleNumber1] = useState('');


  const [isLoggedIn,setIsLoggedIn] = useState(true);
  const [userId,setUserId] = useState(null);
  const [userRoleId,setUserRoleId] = useState('');



  const clickHandler = () => {
    props.history.push('/vehicles/details2/' + vehicleNumber1);
    console.log(vehicleNumber1);
  }

  const backToLogin = () =>{ props.history.push('/login'); }

  //https://run.mocky.io/v3/e951b11f-def4-49ab-92d8-d3cf9dc8fbed
  useEffect(() => {

    const user = localStorage.getItem("user_id");
    setUserId(user);

    if(user==undefined){
      console.log('hi');
      setIsLoggedIn(false);

    }else {



      axios.get('http://localhost:8000/api/allvehiclenumbers/' + localStorage.getItem("user_id"),{
        headers:{
          "Content-type":"application/json",
          Authorization: "Bearer"+localStorage.getItem('token')
        }
      })
        .then(res => {
          //handle response data
          console.log(res);
          setVehicles(res.data.vehicles);

        })
        .catch((err) => {
          //handle error
          console.log(err);
        })


      setUserRoleId(localStorage.getItem('user_role_id'));
      // fetch('http://localhost:8000/api/allvehiclenumbers/1',{
      //   method:'GET',
      //   headers:{"Content-Type":"application/json"},
      //   // body:JSON.stringify(companyDetails)
      // }).then((res)=>{
      //  // console.log(res.data);
      //   setVehicles(res.data.vehicles);
      // }).catch((err)=>{
      //   console.log(err);
      // })
    }

  }, []);


  //const user = JSON.parse(localStorage.getItem('user'));



if(isLoggedIn===true){

  if(userRoleId==1){
    return (
      <div>
        <Message variant='danger'>You Don't Have Permission For Location Tab</Message>
      </div>
    )
  }else {

    return (
      <div>
        <h1>This is view vehicle tab</h1>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="select">Select Vehicle Number</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select"
                   name="select"
                   id="select"
                   onChange={(e) => setVehicleNumber1(e.target.value)}
            >
              <option value="0">Please select</option>
              {vehicles.map((vehicle) => (
                <option
                  values={vehicle}

                > {vehicle}</option>

              ))}
            </Input>
          </Col>
        </FormGroup>
        <Row>
          <Col md="4"></Col>
          <Col md="4">

            <Button
              block color="primary"
              className="btn-pill"
              onClick={clickHandler}
            >View Vehicle Data</Button>

          </Col>
          <Col md="4"></Col>
        </Row>
      </div>
    );

  }

}else if(isLoggedIn===false){
  return (
    <div className="access_denied">
      <Card className="text-white bg-primary ">
        <CardBody>
          <div className="clearfix">
            {/*<h1 className="float-left display-3 mr-4">403</h1>*/}
            <h4 className="pt-3">Please login First</h4>
            <p className="text-muted float-left">
              You don't have permission to access requested page. Please login first
            </p>
            <Row>
              <Col md="4"></Col>
              <Col md="4">
                <Button
                  block color="dark"
                  className="btn-pill"
                  onClick={backToLogin}
                >Login</Button>

              </Col>
              <Col md="4"></Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}









}


