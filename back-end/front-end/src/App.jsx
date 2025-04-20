import Home from "./page/home/home";
import { Route,Routes } from "react-router-dom";
import Dashboard from "./page/dashboard/dashboard"
import Accuiel from "./page/Accuiel/accuiel"
import Topbar from "./components/TopBar/topbar";


function App(){
    return(
        <div>
            <Topbar />
            <Routes>
                <Route path="/" element={<Accuiel/>}/>
                <Route path="/login" element={<Home/>} />
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>

        </div>
    )
}
export default App;
