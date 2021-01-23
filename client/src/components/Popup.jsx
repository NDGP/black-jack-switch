import React from "react"
import ReactDom from "react-dom"
import { Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Popup.css"

export default function Popup({ open, children }){
  if (!open) return null
  return ReactDom.createPortal(
    <>
    <div className="modal-container">
      <Card style={{width:"25rem"}}>
        <Card.Img className="img" variant="top" src="https://gaming.unlv.edu/gallery/BJ.jpg" />
        <Card.Body>
          {children}
        </Card.Body>

      </Card>
  `</div>
    </>,
    document.getElementById('portal')
  )
}