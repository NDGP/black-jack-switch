import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import { useEffect, useState} from "react";
import axios from "axios"
import "./Leaderboard.css"



export default function Rules({ onClose }) {

    const [leaders, setLeaders] = useState([])

  
        useEffect(() => {
            axios.get('/api/stats').then(users => {
                // console.log(users)
                setLeaders(users.data)
            })
            
            
            //             // for (let user in users.data){
                //                 // console.log(user)
                //                 // console.log(users.data[user].first_name)
                //                 // console.log(users.data[user].flag)
                //                 // console.log(users.data[user].wp)
                
                
                
            }, [])
            
            console.log(leaders)
            



            const displayLeaders = leaders.map((user, index) => {
                console.log(user)
              return (
              <tr class="leaderboard">
                <td> {index + 1}. {user.first_name} {user.last_name} </td> 
                <td class='img'> <img src={user.flag} height="20" ></img>  </td>
                <td> {user.wp}% </td>                  
              </tr>
              );
            })

    return (
        <div>
            <h1> Leaderboard! </h1>
            <h3>Winning Percentage</h3>
            <ol>
            {displayLeaders}
            </ol>
            <Button variant="outline-danger" onClick={onClose} >close</Button>
        </div>
    )
}
