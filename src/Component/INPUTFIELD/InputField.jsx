import React from 'react'
import './InputField.css'

function InputField({amount,label, type,onChangeAmount}){
    return(
        <div id='input_field_container'>
        <label id='input_label'>{label}</label><br></br>
        <input id="input_field" type={type} value={amount||0} onChange={onChangeAmount}/>
        </div>
    )
}

export default InputField