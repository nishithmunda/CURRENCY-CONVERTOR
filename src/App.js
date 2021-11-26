import axios from 'axios';
import React,{useEffect,useState} from 'react'
import './App.css';
import InputField from './Component/INPUTFIELD/InputField'
import Select from './Component/SELECT/Select'
const { REACT_APP_API_KEY } = process.env;

const BASE_URL=`https://v6.exchangerate-api.com/v6/${REACT_APP_API_KEY}/latest/INR`

function App() {

  const [currencyOptions,setCurrencyOptions]=useState([])
  const [fromCurrency,setFromCurrency]=useState('')
  const [toCurrency,setToCurrency]=useState('')
  const [exchangeRate,setExchangeRate]=useState()
  const [amount,setAmount]=useState(0)
  const [amountInFromCurrency,setAmountInFromCurrency]=useState(true)


  let toAmount,fromAmount

  if(amountInFromCurrency){
    fromAmount=amount
    toAmount=amount*exchangeRate
  }
  else{
    toAmount=amount
    fromAmount=amount/exchangeRate
  }

  useEffect(()=>{
     loadCurrenyOptions()
  },[])


  
  useEffect(()=>{
    if(fromCurrency !=null && toCurrency!=null)
     {
      const changeInCurrenyOptions=async()=>{ 
        await axios.get(`https://v6.exchangerate-api.com/v6/${REACT_APP_API_KEY}/pair/${fromCurrency}/${toCurrency}`)
            .then(res=>{
              setExchangeRate(res?.data?.conversion_rate)
            })
        
      }
      changeInCurrenyOptions()
     }
  },[fromCurrency,toCurrency])



  const loadCurrenyOptions= async()=>{
       await axios.get(BASE_URL)
       .then((response)=>{
       const CurrencyKey=Object.keys(response?.data?.conversion_rates) //convert object to an ARRAY
       const firstCurrency=CurrencyKey[0]  
       setCurrencyOptions([...CurrencyKey])
       setFromCurrency(response?.data?.base_code)
       setToCurrency(firstCurrency)
       setExchangeRate(response?.data?.conversion_rates[firstCurrency])
       })
       .catch(error=>console.log(error))

  }

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <div className="App">
      <div className="form_container">
       <div id='card_1'>
       <InputField type="number" label="AMOUNT" amount={fromAmount} onChangeAmount={handleFromAmountChange}/>
       <Select 
             currencyOptions={currencyOptions}
             selectCurrency={fromCurrency}
             onChangeCurrency={(e)=>setFromCurrency(e.target.value)}
             label="FROM"
       />
       </div>

       <div id='card_2'>
       <InputField type="number" label="AMOUNT"  amount={toAmount} onChangeAmount={handleToAmountChange}/>
       <Select 
             currencyOptions={currencyOptions}
             selectCurrency={toCurrency}
             onChangeCurrency={(e)=>setToCurrency(e.target.value)}
             label="TO"
        />     
       </div>  
       </div> 
    </div>
  );
}

export default App;
