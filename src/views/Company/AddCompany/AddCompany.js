import React,{useState,useEffect}  from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label, Row
} from "reactstrap";
import axios from "axios";
import csrf from 'csrf';


const AddCompany = (props) =>{


  const user = JSON.parse(localStorage.getItem('user'));
//console.log(user.role_id);

  const[company_name,setCompany_name] = useState('');
  const[company_location,setCompany_location] = useState('');
  const[company_address,setCompany_address] = useState('');

  const[isLoggedIn,setIsLoggedIn] = useState(true);
  const[userId, setUserId] = useState('');


  useEffect(()=>{
    const user = localStorage.getItem("user_id");
    setUserId(user);

    if(user==undefined){
      console.log('hi');
      setIsLoggedIn(false);
    }


    })




 const submitFunc=(e)=>{
   e.preventDefault();
    const companyDetails = {company_name,company_location,company_address};
    console.log(companyDetails);


// const config ={
//   headers:{
//     'Content_Type':'application/json'
//   }
// }
//    const body = {
//      company_name:'wso2',
//      company_location:'jaffna',
//      company_address:'no5555'
//    }
   // axios.post("http://localhost:8000/api/savecompanydetails",JSON.stringify(companyDetails),config)
   //   .then((res)=>{
   //     console.log(res.data);
   //   })
   //   .catch((err)=>{
   //     console.log(err);
   //   });

fetch('http://localhost:8000/api/savecompanydetails',{
  method:'POST',
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(companyDetails)
}).then((res)=>{
  console.log(res.data.reply);
}).catch((err)=>{
  console.log(err);
})


    setCompany_name('');
    setCompany_address('');
    setCompany_location('');
  }

  const backToLogin = () =>{props.history.push('/login');}



  if(isLoggedIn===true){
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Add company</strong>
          </CardHeader>

          <CardBody>
            <Form

              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={submitFunc}
            >
              <FormGroup row>
                {/*space for empty row  */}
                <Col md="3">
                  <Label></Label>
                </Col>
                <Col xs="12" md="9">
                  <p className="form-control-static">-</p>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Company Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="company-name"
                    name="company-name"
                    placeholder="Company Name"
                    value={company_name}
                    onChange={(e) => setCompany_name(e.target.value)}
                  />

                  <FormText color="muted">Please Enter Company Name </FormText>
                </Col>
              </FormGroup>


              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Company Location</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="company-location"
                    name="company-location"
                    placeholder="company-location"
                    value={company_location}
                    onChange={(e) => setCompany_location(e.target.value)}
                  />

                  {/*<FormText color="muted">Please Enter Transport Manager First Name </FormText>*/}
                </Col>
              </FormGroup>


              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Company Address</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="company-address"
                    name="company-address"
                    placeholder="company-address"
                    value={company_address}
                    onChange={(e) => setCompany_address(e.target.value)}
                  />

                  {/*<FormText color="muted">Please Enter Transport Manager First Name </FormText>*/}
                </Col>
              </FormGroup>


              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o" /> Submit
              </Button>
              <Button type="reset" size="sm" color="danger">
                <i className="fa fa-ban" /> Reset
              </Button>
            </Form>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );

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

export default AddCompany;
