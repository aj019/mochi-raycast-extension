import React,{useEffect,useState} from 'react'
import {Action, ActionPanel, List} from '@raycast/api'
import {fetchNFTCollections} from './api'

export default function SearchToken() {
   const [nfts,setNfts] = useState([]) 

   useEffect(() => {
       async function fetchNFTCollectionsData() {
         try{
            const nfts = await fetchNFTCollections()
            console.log('nfts: ', nfts.data.data);
            setNfts(nfts.data.data)

         } catch(err) {
            console.log(err);
         }
       }
       
       fetchNFTCollectionsData()
   },[])

  return (
      <List filtering={true} isShowingDetail>
          {nfts.map(nft =>
              <List.Item 
                key={nft.id}
                title={`${nft.name} (${nft.symbol})`} 
                icon={nft.image}
                detail={
                    <List.Item.Detail
                      metadata={
                        <List.Item.Detail.Metadata>
                            <List.Item.Detail.Metadata.Label title="ID" text={`${nft.id}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label icon={nft.image} title="NAME" text={`${nft.name}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="ADDRESS" text={`${nft.address}`} />
                            <List.Item.Detail.Metadata.Separator />
                            <List.Item.Detail.Metadata.Label title="SYMBOL" text={`${nft.symbol}`} />
                            <List.Item.Detail.Metadata.Separator />
                            {/* <List.Item.Detail.Metadata.Link
                            title="Checkout on CoinGecko"
                            target={`https://www.coingecko.com/en/coins/${nft.coin_gecko_id}`}
                            text={`${nft.coin_gecko_id}`}
                            /> */}
                        </List.Item.Detail.Metadata>
                      }
                    />
                  }
               />)
        }
      </List>
  )
}
