import {Link} from 'react-router-dom';
import './navbar.css';



function Navbar(){


    return(
        <div className='logo'>
            <Link to='/'><img src='./logo.png' alt='' width="58px" height="55px"/></Link>
        </div>
    )
}
export default Navbar;
