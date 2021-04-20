import React,{useEffect, useState,useParams} from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useForm } from 'react-hook-form';
import logo from './res/header.png';
import "./styles.css";	
import hisData from"./hisData.json";	
import 'bootstrap/dist/css/bootstrap.css';
import  {	Table,
		Row,
		Col,
		Container,
		Jumbotron,
		Button,
		Form,
		TextField,
		Badge,
		} from "react-bootstrap";
import Tabletop from 'tabletop';

const IndexPage = () => {
	const { register, handleSubmit, errors } = useForm();
	//const [memID, setMemID] = useState(0);
	const onSubmit= herData => {			
		//e.preventDefault();
		//user = e.target.value;
		let tempMemID;
		let fullName = herData['First name'].concat(" ",herData['Last name']); //merge string
		tempMemID = initJSON(hisData,fullName);
		//setMemID(tempMemID);
		location.replace("/scomwa-election-49/about/".concat(tempMemID));	//edited 0104 : temp disable for debug		
		}
	return (	
		<Form onSubmit={handleSubmit(onSubmit)}>
			<div><br/></div>	
			<Row className="justify-content-md-center">				
				<Col xs md lg="8"><Form.Control 
					type="text" 
					placeholder="ชื่อ" 
					name="First name" 
					title="ชื่อ"
					ref={register({required: true, minLength: 1, maxLength: 32})} 
					/></Col>			
			</Row>
			<div><br/></div>
			<Row className="justify-content-md-center">				
				<Col xs md lg="8"><Form.Control 
					type="text" 
					placeholder="นามสกุล" 
					name="Last name" 
					ref={register({required: true, minLength: 1, maxLength: 32})} 
					/></Col>			
			</Row>
			<div><br/></div>
			<Row className="justify-content-md-center">
				<Col xs md lg="2"></Col>
				<Col xs md lg="8">	
					<Button type="submit"  variant="primary">ตรวจสอบข้อมูล</Button>
					</Col>
				<Col xs md lg="2"></Col>	
			</Row>
			<div><br/></div>
			<Row className="justify-content-md-center"><h6 style={{display: "inline"}}>วิธีใช้งาน : ระบุเฉพาะ ชื่อ - นามสกุล โดยไม่ต้องมีคำนำหน้าชื่อ</h6></Row>	
			<Row className="justify-content-md-center"><h6 style={{display: "inline"}}>หากไม่พบข้อมูลกรุณาติดต่อ 02-503-9996</h6></Row>	
		</Form>		
		);
	};

const AboutPage = ({ match, location }) => {
	let aboutID = location["pathname"].replace("/scomwa-election-49/about/",'');
	return(
		<>
		<Row className="justify-content-md-center">
		{aboutAction(aboutID)}
		</Row>
		<Link to="/scomwa-election-49"><Button variant="primary">กลับหน้าหลัก</Button></Link>
		</>
		) 
	};
	
function aboutAction(aboutID){
	let aboutPoint;
	//console.log("after phase = ",parseInt(aboutID));	
	if(parseInt(aboutID) < 2134) aboutPoint = 1;
	else	if(parseInt(aboutID) < 3880) aboutPoint = 2;
		else 	if(parseInt(aboutID) < 5387) aboutPoint = 3;
			else	if(parseInt(aboutID) < 7430) aboutPoint = 4;
				else	if(parseInt(aboutID) < 8613) aboutPoint = 5;
					else	if(parseInt(aboutID) < 9481) aboutPoint = 6;
						else	if(parseInt(aboutID) < 10355) aboutPoint = 7;
							else	if(parseInt(aboutID) < 11092) aboutPoint = 8;
								else	if(parseInt(aboutID) < 11763) aboutPoint = 9;
									else	if(parseInt(aboutID) < 12450) aboutPoint = 10;
										else	if(parseInt(aboutID) < 13156) aboutPoint = 11;
											else aboutPoint = 12;		
	if(aboutID.length==5) return(
		<>
		<Table>
		<Row className="blob_1 justify-content-md-center"><h2>เลขสมาชิกของท่านคือ หมายเลข{aboutID}</h2></Row>	
		<Row className="blob_2 justify-content-md-center"><h4>จุดลงทะเบียนที่ {aboutPoint}</h4></Row>
		</Table>
		</>
		);
	else return(<h3>ไม่พบข้อมูลในระบบ โปรดตรวจสอบ ชื่อ-นามสกุลอีกครั้ง หรือติดต่อเจ้าหน้าที่</h3>);
	}
	
function initJSON(hisData,fullName) {
	var memID;
	var results = [];
	for (var i=0 ; i < hisData.length ; i++){
		if (hisData[i]["FULLNAME"] == fullName)  {
			results.push(hisData[i]["ID"]);
			break; 
			} 
		}
	memID = results;
	return memID;
	}
	
function App() {
	return (
		<>
		<Jumbotron style={{backgroundColor: "#FFFFFF"}}></Jumbotron>
		<Container>
			<Jumbotron style={{backgroundColor: "#91D8F9"}}>	
				<a href="/scomwa-election-49"><img src={logo} className="img-fluid" alt="logo" /></a>
				<h5> </h5>
				<Router>
					<Switch>
						<Route exact path="/scomwa-election-49" component={IndexPage} />
						<Route path="/scomwa-election-49/about" component={AboutPage} />
					</Switch>
				</Router>			
			</Jumbotron>
		</Container>
		</>
		);
	}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
