import Home from "./page/home/home";
import { Route,Routes } from "react-router-dom";
import Dashboard from "./page/dashboard/dashboard"
import Accuiel from "./page/Accuiel/accuiel"
import Topbar from "./components/TopBar/topbar";
import Footer from "./components/Footer/footer";
import Service from "./page/nos-service/service";
import VillaCrud from "./page/nos-service/villaCrud";

//import Services from "./page/services/Services";



function App(){
    return(
        <div>
            <Topbar />

            <Routes>
                <Route path="/" element={<Accuiel/>}/>
                <Route path="/login" element={<Home/>} />
                <Route  path="/villas" element={<Service/>}/>
                <Route path="/villaCrud" element={<VillaCrud/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            
            <Footer/>

        </div>
    )
}
export default App;
