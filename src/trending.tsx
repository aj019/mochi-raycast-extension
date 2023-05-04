import React,{useEffect,useState} from 'react'
import {Action, ActionPanel, List,Detail} from '@raycast/api'
import {fetchTrendingTokens} from './api'

export default function MarketData() {
   const [trendingtokens,setTrendingTokens] = useState([]) 

   useEffect(() => {
       async function fetchAllTrendingTokens() {
         try{
            const fetchedTrendingTokens = await fetchTrendingTokens()
            console.log('trendingtokens: ',fetchedTrendingTokens.data);            
            setTrendingTokens(fetchedTrendingTokens.data.coins)
         } catch(err) {
            console.log(err);
         }
       }
       
       fetchAllTrendingTokens()
   },[])

   const formatAmount = (amount: any) => {
        return amount.toLocaleString('en-US',{maximumFractionDigits:2})
   }

  return (
    <List filtering={true} isShowingDetail>
    {trendingtokens.map(data =>
        <List.Item 
          key={data.item.id}
          title={`${data.item.name} (${data.item.symbol})`} 
          icon={data.item.thumb}
          detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>                      
                      <List.Item.Detail.Metadata.Label title="Id" text={`${data.item.id}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label icon={data.item.thumb} title="Name" text={`${data.item.name}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Current Price" text={`${data.item.price_btc} BTC`} />
                      <List.Item.Detail.Metadata.Separator />
                      {/* <List.Item.Detail.Metadata.Label title="Market Cap" text={`$${formatAmount(data.market_cap)}`} />
                      <List.Item.Detail.Metadata.Separator /> */}
                      <List.Item.Detail.Metadata.Label title="Market Cap Rank" text={`${data.item.market_cap_rank}`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      {/* <List.Item.Detail.Metadata.Label title="Price Change in 1hr" text={`${formatAmount(data.price_change_percentage_1h_in_currency)}%`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Price Change in 24hr" text={`${formatAmount(data.price_change_percentage_24h_in_currency)}%`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Price Change in 7d" text={`${formatAmount(data.price_change_percentage_7d_in_currency)}%`} />  */}
                  </List.Item.Detail.Metadata>
                }
              />
            }
         />)
        }
        </List>
  )
}
