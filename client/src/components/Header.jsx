import {Link} from 'react-router-dom'
import "./Header.css";

export default function Header(props){
  return (
    <div class="dropdown">
  <button class="dropbtn">Menu</button>
  <div id="myDropdown" class="dropdown-content">
      <Link to="/deposit"> Deposit</Link>
      <Link to="/withdraw"> Withdraw</Link>
      <Link to="/login"> Login</Link>
      <button class="logout">Logout </button>  
      </div>
    </div>
  )
}