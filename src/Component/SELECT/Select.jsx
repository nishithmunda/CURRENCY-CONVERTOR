import React from 'react'
import './Select.css'
function Select({
 currencyOptions,
 selectCurrency,
 onChangeCurrency,
 label
}){

   return(
   <div id='select_container'>    
   <label id='select_label'>{label}</label><br></br>
   <select id="select" value={selectCurrency} onChange={onChangeCurrency}>
       {
           currencyOptions.map((opts,index)=>(
              <option key={index} value={opts}>{opts}</option>
           ))
       }
   </select>
   </div>
   )
}
export default Select