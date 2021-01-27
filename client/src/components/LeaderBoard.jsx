import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"
import { useEffect } from "react";
import axios from "axios"



// let leaders = () => {
    //     axios.get(('/api/users/leaderBoard').then(res => {
        //         for( let user in res){
            //             console.log(user)
            //         }
            // }
            
export default function Rules({onClose}) {

    useEffect(() => {
        axios.get('/api/users/leaderBoard').then(users => {
               for (let user in users){
                   return <li> `${user}.` ${users.user.first_name}</li>
               }
        })
    }, [])
    return (
        <div>
            <h1> Leader Board! </h1>
            <ul>
            </ul>
                <Button variant="outline-danger" onClick={onClose} >close</Button>
        </div>
    )
}
