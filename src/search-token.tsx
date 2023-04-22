import React,{useEffect,useState} from 'react'
import {Action, ActionPanel, List} from '@raycast/api'
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
      <List filtering={true} isShowingDetail>
          {tokens.map(token =>
              <List.Item 
                key={token.id}
                title={`${token.name} (${token.symbol})`} 
                detail={
                    <List.Item.Detail
                      metadata={
                        <List.Item.Detail.Metadata>
                            <List.Item.Detail.Metadata.Label title="ID" text={`${token.id}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="NAME" text={`${token.name}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="ADDRESS" text={`${token.address}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="SYMBOL" text={`${token.symbol}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="CHAIN" text={`${token.chain.name}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Link
                            title="Checkout on CoinGecko"
                            target={`https://www.coingecko.com/en/coins/${token.coin_gecko_id}`}
                            text={`${token.coin_gecko_id}`}
                            />
                        </List.Item.Detail.Metadata>
                      }
                    />
                  }
               />)
        }
      </List>
  )
}
