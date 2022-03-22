import axios from "axios";
import { sleep } from "../utils/sleep";

interface SeedCalc {
    max: number,
    min: number,
    avg: number
}


/// <reference types="spotify-api" />
class RecommendationService {
    public getRecommendations = async (token: string, tracksSeed: string, artistsSeed:string, genresSeed:string, valenceSeed:SeedCalc, energySeed:SeedCalc): Promise<SpotifyApi.RecommendationsFromSeedsResponse | any> => {
        try {
            const api = await axios({
                method: 'get',
                baseURL: `https://api.spotify.com/v1/recommendations?seed_artists=${artistsSeed}&seed_genres=${genresSeed}&seed_tracks=${tracksSeed}&min_energy=${energySeed.min}&max_energy=${energySeed.max}&target_energy=${energySeed.avg}&min_valence=${valenceSeed.min}&max_valence=${valenceSeed.max}&target_valence=${valenceSeed.avg}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            
            const returnSpotify = api.data as SpotifyApi.RecommendationsFromSeedsResponse[]
            return returnSpotify
            
        } catch (error:any) {
            if (error.response!.status === 429) {
                sleep(error.response.headers['retry-after'] as unknown as number).then(
                    await this.getRecommendations(token, tracksSeed, artistsSeed, genresSeed, valenceSeed, energySeed)
                )
            }
        }
    }
    //  add Get Track para pegar as imagens
}

export const recommendationService = new RecommendationService()