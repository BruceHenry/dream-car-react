import React from 'react'
import Option from './Option'

const Options = (props) => (
    <div>
        {
            props.options.map((option) => (<Option key={option} text={option} deleteOption={props.deleteOption} />))
        }
    </div>
);
export default Options;