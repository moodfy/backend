import axios from "axios";

class PlaylistService {
    public getArtistsAlbums = async (token: string, artistId: string): Promise<SpotifyApi.ArtistsAlbumsResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `	https://api.spotify.com/v1/artists/${artistId}/albums`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.ArtistsAlbumsResponse
        return returnSpotify
    }

    public getArtistsRelatedArtists = async (token: string, artistId: string): Promise<SpotifyApi.ArtistsRelatedArtistsResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `	https://api.spotify.com/v1/artists/${artistId}/related-artists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.ArtistsRelatedArtistsResponse
        return returnSpotify
    }

    public getArtistsTopTracks = async (token: string, artistId: string): Promise<SpotifyApi.ArtistsTopTracksResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `	https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.ArtistsTopTracksResponse
        return returnSpotify
    }

    public getArtist = async (token: string, artistId: string): Promise<SpotifyApi.ArtistSearchResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `	https://api.spotify.com/v1/artists/${artistId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.ArtistSearchResponse
        return returnSpotify
    }

    public getSeveralArtist = async (token: string, artistId: string): Promise<SpotifyApi.MultipleArtistsResponse> => {
        const api = await axios({
            method: 'get',
            baseURL: `	https://api.spotify.com/v1/artists?ids=${artistId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const returnSpotify = api.data as SpotifyApi.MultipleArtistsResponse
        return returnSpotify
    }

}

export const playlistService = new PlaylistService()