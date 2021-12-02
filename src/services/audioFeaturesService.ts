import axios from "axios";

/// <reference types="spotify-api" />
class AudioFeaturesService {
    // A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
    public getMultipleAudioFeatures = async (token: string, tracks: string): Promise<SpotifyApi.MultipleAudioFeaturesResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `https://api.spotify.com/v1/audio-features?ids=${tracks}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const returnSpotify = api.data as SpotifyApi.MultipleAudioFeaturesResponse
 
        return returnSpotify
    }

}

export const audioFeaturesService = new AudioFeaturesService()