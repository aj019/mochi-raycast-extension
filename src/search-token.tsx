import React,{useEffect,useState} from 'react'
import {List} from '@raycast/api'
import {fetchTokens} from './api'

export default function SearchToken() {
   const [tokens,setTokens] = useState([]) 

   useEffect(() => {
       async function fetchTokensData() {
         try{
            const tokens = await fetchTokens()
            console.log('tokens: ', tokens.data.data);
            setTokens(tokens.data.data)

         } catch(err) {
            console.log(err);
         }
       }
       
       fetchTokensData()
   },[])

  return (
    <List filtering={true}>
        {tokens.map(token => <List.Item key={token.id} title={`${token.name} (${token.symbol})`} />)}
    </List>
  )
}
