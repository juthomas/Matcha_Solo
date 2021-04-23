import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from "./pages/Register/Register"
import Start from "./pages/Start/Start"
import Navbar from "./components/Navbar/Navbar"
import Login from "./pages/Login/Login"
import MailConfirmation from "./pages/MailConfirmation/MailConfirmation"
import ResetCredentials from "./pages/ResetCredentials/ResetCredentials"
import SetPassword from "./pages/SetPassword/SetPassword"
import Home from "./pages/Home/Home"
// import Upload from "./pages/Upload/Upload"

function App() {
	return (
		<div>
			{/* <Navbar/> */}
			<Router>
				
				<Route path="/" exact render={() => <Start/>}/>
				<Route path="/login" exact render={() => <Login/>}/>
				<Route path="/register" exact render={() => <Register/>}/>
				<Route path="/mailconfirmation" exact render={() => <MailConfirmation/>}/>
				<Route path="/resetcredentials" exact render={() => <ResetCredentials/>}/>
				<Route path="/setpassword" exact render={() => <SetPassword/>}/>
				<Route path="/loggedin"  render={() => <Navbar highlight="1"/>}></Route>
				<Route path="/loggedin/home" exact render={() => <Home/>}/>
				{/* 
				<Route path="/upload" exact render={() => <Upload/>}/>
				<Route path="/register" exact render={() => <Register/>}/>
				<Route path="/login" exact render={() => <Login/>}/> */}
			</Router>
		</div>
	);
}

export default App;
