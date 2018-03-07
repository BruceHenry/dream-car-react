import React from 'react'

const Option = (props) => (
    <div className="option">
        <p className="option__text">{props.text} </p>
        <button className="button button--remove" onClick={(e) => { props.deleteOption(props.text) }}>Remove</button>
    </div>
);
export default Option;