import axios from "axios";

/// <reference types="spotify-api" />
class PlaylistService {
    public getUserPlaylists = async (token: string, userId: string): Promise<SpotifyApi.PlaylistObjectSimplified> => {
        const api = await axios({
            method: 'get',
            baseURL: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.PlaylistObjectSimplified
        return returnSpotify
    }

    public getCurrentUserPlaylists = async (token: string, userId: string): Promise<SpotifyApi.PlaylistObjectSimplified> => {
        const api = await axios({
            method: 'get',
            baseURL: `https://api.spotify.com/v1/me/playlists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.PlaylistObjectSimplified
        return returnSpotify
    }
}

export const playlistService = new PlaylistService()