import fetch from 'node-fetch'

export async function fetchTokens() {
    const url = "https://develop-api.mochi.pod.town/api/v1/defi/tokens?page=0&size=41";
    const response = await fetch(url, {
        method: "GET"        
    })
    // console.log(response);
    return response.json()
}

export async function fetchMarketData() {
    const url = "https://api.mochi.pod.town/api/v1/defi/market-data";
    const response = await fetch(url, {
        method: "GET"        
    })
    // console.log(response);
    return response.json()
}

export async function fetchNFTCollections() {
    const url = "https://develop-api.mochi.pod.town/api/v1/nfts/collections?page=0&size=100";
    const response = await fetch(url, {
        method: "GET"        
    })
    // console.log(response);
    return response.json()
}

export async function fetchTrendingTokens() {
    const url = "https://api.mochi.pod.town/api/v1/defi/trending";
    const response = await fetch(url, {
        method: "GET"        
    })
    // console.log(response);
    return response.json()
}

export async function convertPrice(base: string,target: string,amount: string) {
    const url = "https://api.indexer.console.so/api/v1/token/convert-price";
    let payload = {
        from: base.toUpperCase(),
        to: target.toUpperCase(),
        amount: amount,
    }
    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)

    })
    // console.log(response);
    return response.json()
}