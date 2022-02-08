import React from "react";

function Note(props)
{
    return(
    <div className="note">
        <h1>{props.Title}</h1>
        <p>{props.Content}</p>
    </div>);
}

export default Note