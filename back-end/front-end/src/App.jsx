import Home from "./page/home/home";
import { Route,Routes } from "react-router-dom";
import Dashboard from "./page/dashboard/dashboard"
import Accuiel from "./page/Accuiel/accuiel"
import Topbar from "./components/TopBar/topbar";
import Footer from "./components/Footer/footer";
import Service from "./page/nos-service/service";
import VillaCrud from "./page/dashboard/villaCrud";
import Utilisateurs from './page/dashboard/utilisateurs';
import VillaDetails from './page/VillaDetails/VillaDetails'; 
import Tirage from './page/tirage/tirage';
import AcheterCle from './page/AcheterCle/AcheterCle'; 
import VillaManagement from './page/dashboard/VillaManagement';



//import Services from "./page/services/Services";



function App(){
    return(
        <div>
           

            <Routes>
                <Route path="/" element={<Accuiel/>}/>
                <Route path="/login" element={<Home/>} />
                <Route  path="/villas" element={<Service/>}/>
                <Route path="/villaCrud" element={<VillaCrud/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/users" element={<Utilisateurs />} />
                <Route path="/villa/:id" element={<VillaDetails />} /> {/* <-- route detail */}
                <Route path="/tirage" element={<Tirage />} /> {/* ajoute route */}
                <Route path="/acheter-cle" element={<AcheterCle />} />
                <Route path="/admin/villa-management" element={<VillaManagement />} />
            </Routes>
            
            

        </div>
    )
}
export default App;
