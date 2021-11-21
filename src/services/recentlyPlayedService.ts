import axios from "axios";

/// <reference types="spotify-api" />
class RecentlyPlayedService {

    public getRecentPlayed = async (token: string): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `https://api.spotify.com/v1/me/player/recently-played`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const returnSpotify = api.data as SpotifyApi.UsersRecentlyPlayedTracksResponse
 
        return returnSpotify
    }

}

export const recentlyPlayedService = new RecentlyPlayedService()