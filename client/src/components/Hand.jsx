import React from "react";

export default function Hand(props) {
  
  return (
    <div class="hand">
          <div >
            {props.name}: {props.value}
            <img src={props.image3} alt="ERROR"></img>
            <img src={props.image4} alt="ERROR"></img>
          </div>

          <button onClick={() => console.log('clicked')}>Click to console.log</button>;

      </div>
  );
}