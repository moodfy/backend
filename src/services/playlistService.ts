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

    public createPlaylist = async (token: string, userId: string): Promise<SpotifyApi.PlaylistObjectSimplified> => {
        const api = await axios({
            method: 'post',
            baseURL: `https://api.spotify.com/v1/users/${userId}/playlists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                "name": "Moodfy Recomenda",
                "description": "Playlist de recomendação gerada pelo moodfy",
                "public": true
            }
        })
        const returnSpotify = api.data as SpotifyApi.PlaylistObjectSimplified

        return returnSpotify
    }

    public addTracks = async (token: string, playlistId: string, tracksPlaylist: string): Promise<SpotifyApi.PlaylistObjectSimplified> => {
        try {


            const api = await axios({
                method: 'post',
                baseURL: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksPlaylist}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const returnSpotify = api.data as SpotifyApi.PlaylistObjectSimplified

            return returnSpotify
        } catch (error) {
            console.log(error)
        }
    }
}

export const playlistService = new PlaylistService()