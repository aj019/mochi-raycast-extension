import fetch from 'node-fetch'

export async function fetchTokens() {
    const url = "https://develop-api.mochi.pod.town/api/v1/defi/tokens?page=0&size=41";
    const response = await fetch(url, {
        method: "GET"        
    })
    // console.log(response);
    return response.json()
}