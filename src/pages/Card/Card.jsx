import React from "react";
import "./Card.css";
const Card = (props) => {

  // const data = props.children
  return(
    <div className="container">
      <div className="card">{props.children}</div>
    </div>
  )
 
};

export default Card;
