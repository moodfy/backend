import axios from "axios";

interface AlbumAudioAnalisys {
    energy: number;
    id: string;
    valence: number;
    name: string;
    album: string;
}

class AlbumService {

    public getAlbumTracks = async (token: string, album: string): Promise<SpotifyApi.AlbumTracksResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `https://api.spotify.com/v1/albums/${album}/tracks`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.AlbumTracksResponse
        return returnSpotify
    }
}

export const albumService = new AlbumService()