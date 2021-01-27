import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import { useEffect, useState} from "react";
import axios from "axios"



export default function Rules({ onClose }) {

    const [leaders, setLeaders] = useState([])

  
        useEffect(() => {
            axios.get('/api/users/leaderBoard').then(users => {
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
            



            const displayLeaders = leaders.map(user => {
                console.log(user)
              return (
              <li>
                  {user.first_name} {user.last_name} <img src={user.flag} height="20"></img> {user.wp}%
              </li>
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
