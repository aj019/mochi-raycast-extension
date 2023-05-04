import React,{useEffect,useState} from 'react'
import {Action, ActionPanel, Form,Detail} from '@raycast/api'
import {fetchMarketData,convertPrice} from './api'

export default function Convert() {
    const [marketData,setMarketData] = useState([]) 
    const [base,setBase] = useState("btc") 
    const [target,setTarget] = useState("eth")
    const [amount,setAmount] = useState("2") 
    const [result,setResult] = useState("") 

   useEffect(() => {
       async function fetchAllMarketData() {
         try{
            const fetchedMarketData = await fetchMarketData()
            // console.log('marketData: ',fetchedMarketData.data);            
            setMarketData(fetchedMarketData.data)
         } catch(err) {
            console.log(err);
         }
       }
       
       fetchAllMarketData()
   },[])

   const onSubmit = () => {
    async function convertPriceFromBaseToTarget() {
        try{
           const res = await convertPrice(base,target,amount)
           console.log('res: ', res);
           if(res.data && res.data?.to) {
              let convertedvalue = res.data?.to?.amount
              setResult(`${amount} ${base} = ${convertedvalue} ${target} `)  
           } else {
              setResult("Please Enter a valid Amount")  
           }
                     
           
        } catch(err) {
           console.log(err);
        }
      }
      
      convertPriceFromBaseToTarget()
   }
   
  return (
    <Form
    
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit Favorite" onSubmit={(values) => onSubmit()} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="base" title="Base" value={base} onChange={(values) => setBase(values)}>
        {marketData.map(data => {
            return <Form.Dropdown.Item value={data.symbol} title={data.name} key={data.id} icon={data.image} />
        })}        
      </Form.Dropdown>
      <Form.Dropdown id="target" title="Target" value={target} onChange={(values) => setTarget(values)}>
        {marketData.map(data => {
            return <Form.Dropdown.Item value={data.symbol} key={`${data.id}1`}title={data.name} icon={data.image} />
        })}        
      </Form.Dropdown>
      <Form.TextField id="amount" title="Amount" value={amount} onChange={(values) => setAmount(values)} />
      {result && <Form.Description
        title={"Result"}
        text={result}
      />}
    </Form>
  )
}
