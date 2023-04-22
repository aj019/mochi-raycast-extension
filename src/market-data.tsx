import React,{useEffect,useState} from 'react'
import {Action, ActionPanel, List,Detail} from '@raycast/api'
import {fetchMarketData} from './api'

export default function MarketData() {
   const [marketData,setMarketData] = useState([]) 

   useEffect(() => {
       async function fetchAllMarketData() {
         try{
            const fetchedMarketData = await fetchMarketData()
            console.log('marketData: ',fetchedMarketData.data);            
            setMarketData(fetchedMarketData.data)
         } catch(err) {
            console.log(err);
         }
       }
       
       fetchAllMarketData()
   },[])

   const formatAmount = (amount: any) => {
        return amount.toLocaleString('en-US',{maximumFractionDigits:2})
   }

  return (
    <List filtering={true} isShowingDetail>
    {marketData.map(data =>
        <List.Item 
          key={data.id}
          title={`${data.name} (${data.symbol})`} 
          icon={data.image}
          detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>                      
                      <List.Item.Detail.Metadata.Label title="Id" text={`${data.id}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label icon={data.image} title="Name" text={`${data.name}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Current Price" text={`$${formatAmount(data.current_price)}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Market Cap" text={`$${formatAmount(data.market_cap)}`} />
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Market Cap Rank" text={`${data.market_cap_rank}`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Price Change in 1hr" text={`${formatAmount(data.price_change_percentage_1h_in_currency)}%`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Price Change in 24hr" text={`${formatAmount(data.price_change_percentage_24h_in_currency)}%`} /> 
                      <List.Item.Detail.Metadata.Separator />
                      <List.Item.Detail.Metadata.Label title="Price Change in 7d" text={`${formatAmount(data.price_change_percentage_7d_in_currency)}%`} /> 
                  </List.Item.Detail.Metadata>
                }
              />
            }
         />)
        }
        </List>
  )
}
