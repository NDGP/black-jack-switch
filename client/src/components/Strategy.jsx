import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"


export default function Strategy( { onClose } ) {
    return (

        
        <div>
            <Form>
                <div>
                    <img src="http://www.blackjackswitch.com/images/bj_switch.gif" alt="Whoops"></img>
                </div>
                <Button variant="outline-danger" onClick={onClose} >close</Button>
            </Form>
        </div>
    )
}



