import axios from "axios"

export const getNewReleases = async () => {
    try{
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
            params: {
                limit: 20,
                offset: 0
            }
        });
        return response.data;
    }catch(err){
        
    }
}