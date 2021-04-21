import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Register from "./pages/Register/Register"
import Start from "./pages/Start/Start"
// import Navbar from "./components/Navbar"
// import Login from "./pages/Login/Login"
// import Upload from "./pages/Upload/Upload"

function App() {
	return (
		<div>
			{/* <Navbar/> */}
			<Router>
				
				<Route path="/" exact render={() => <Start/>}/>
				<Route path="/register" exact render={() => <Register/>}/>
				
				{/* 
				<Route path="/upload" exact render={() => <Upload/>}/>
				<Route path="/register" exact render={() => <Register/>}/>
				<Route path="/login" exact render={() => <Login/>}/> */}
			</Router>
		</div>
	);
}

export default App;
