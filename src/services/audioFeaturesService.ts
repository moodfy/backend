import axios from "axios";
import { sleep } from "../utils/sleep";

/// <reference types="spotify-api" />
class AudioFeaturesService {
    // A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
    public getMultipleAudioFeatures = async (token: string, tracks: string): Promise<SpotifyApi.MultipleAudioFeaturesResponse[] | any> => {
        //     console.log(tracks)
        try {
            const api = await axios({
                method: 'get',
                baseURL: `https://api.spotify.com/v1/audio-features?ids=${tracks}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const returnSpotify = api.data as SpotifyApi.MultipleAudioFeaturesResponse[]
            return returnSpotify
            
        } catch (error) {
            if (error.response!.status === 429) {
                sleep(error.response.headers['retry-after'] as unknown as number).then(
                    await this.getMultipleAudioFeatures(token, tracks)
                )
            }
        }
    }
    //  add Get Track para pegar as imagens
}

export const audioFeaturesService = new AudioFeaturesService()