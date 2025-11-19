//w wersji publicznej ta funkcja powinna być wykonywana przez serwer (back-end) z powodu wrażliwych danych używanych do pobrania tokenu
//CLIENT_SECRET nie może być okazywany innym, nie może być publiczny
interface Token{
    access: string;
    expires: number;
}


const getTokenFromSpotify = async () => {
  const CLIENT_ID = "6f91e25b8fc24490bca2eaf4dc3fa7dc";
  const CLIENT_SECRET = "f60da94430d0489185a32d79a499b947";

  const authString = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      })
    });

    if (!response.ok) {
      console.error('Spotify token request failed:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
    } catch (error) {
    console.error('Error fetching Spotify token:', error);
    return null;
    }
};

const saveToken = async () =>{
    const tokenData = await getTokenFromSpotify()
    if (!tokenData) return
    const expiresAt = Date.now() + tokenData.expires_in * 1000;

    const token: Token ={
        access: tokenData.access_token,
        expires: expiresAt
    }

    localStorage.setItem("stored_token",JSON.stringify(token))
    return JSON.stringify(token)
}

export const getToken = async () => {
    let stored_token:any;
    stored_token = localStorage.getItem("stored_token")
    if(!stored_token){
        stored_token = await saveToken()
    }

    try {
        const token_obj: Token = JSON.parse(stored_token)
        if (Date.now() < token_obj.expires){
            return token_obj.access
        } else {
            localStorage.removeItem("spotify_token")
            stored_token = await saveToken()
            const new_token: Token = JSON.parse(stored_token)
            return new_token.access
        }
    } catch {
        console.error("Token getting failure: ", Error);
    }
}
