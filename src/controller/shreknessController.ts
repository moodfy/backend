import { NextFunction, Request, Response } from "express"

import { audioFeaturesService } from "../services/audioFeaturesService"
import { recentlyPlayedService } from "../services/recentlyPlayedService"
import { valenceService } from "../services/valenceService"
import { User } from "../models/user";
import { recommendationService } from "../services/recomendationService";
import { playlistService } from "../services/playlistService"

interface AlbumAudioAnalisys {
    y: number;
    id: string;
    x: number;
    label: string;
    album: string;
    r: number
}

interface Dataset {
    label: string,
    data: [{
        y: number,
        x: number,
        r: number
    }],
}

interface SeedCalc {
    max: number,
    min: number,
    avg: number
}

export class ShreknessController {
    public async calculate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as SpotifyApi.UserObjectPrivate

            const userDb = await User.findOne({
                where: { spotifyId: user.id }
            })

            if (userDb) {
                const recentes = await recentlyPlayedService.getRecentPlayed(userDb.acessToken)

                let tracks = ''
                recentes.items.forEach((element: { track: { id: string; }; }) => {
                    tracks += element.track.id + `,`
                });

                const audioFeatures = await audioFeaturesService.getMultipleAudioFeatures(userDb.acessToken, tracks)
                // https://open.spotify.com/artist/77Dl9332vjr060pj5LbWuN?si=LkoeaQ44Rl-2XBzS46mFvA
                // anum preto 01zIROcqWjGFgVJxYGxq9O
                // const albuns = await artistService.getArtistsAlbums(userDb.acessToken, '01zIROcqWjGFgVJxYGxq9O')

                // let tracks = ''
                let audioAnalisys: AlbumAudioAnalisys
                let result: AlbumAudioAnalisys[] = []
                // let audioFeatures
                let label = []
                let dataset: Dataset[] = []
                // for (const element of albuns.items) {
                // trackResult = await albumService.getAlbumTracks(userDb.acessToken, element.id)
                //     for (const iterator of trackResult.items) {
                //         tracks += iterator.id + ','
                //     }

                // await this.recomendations(audioFeatures, recentes, userDb)
                // audioFeatures = await audioFeaturesService.getMultipleAudioFeatures(userDb.acessToken, tracks)
                tracks = ''
                if (typeof audioFeatures !== 'undefined') {
                    for await (const track of recentes.items) {
                        for await (const audioFeature of audioFeatures.audio_features) {
                            if (JSON.stringify(audioFeature.id) === JSON.stringify(track.track.id)) {
                                audioAnalisys = {
                                    y: audioFeature.energy,
                                    id: audioFeature.id,
                                    x: audioFeature.valence,
                                    label: track.track.name,
                                    album: track.track.artists[0].name,
                                    r: 10
                                }
                                label.push(track.track.name)
                                result.push(audioAnalisys)
                            }
                        }
                    }
                }
                // }
                const resultado = await valenceService.calculaValencia(audioFeatures)
                res.render('index.html', { resultado, user: req.user, result, label });
            }
        } catch (err) {
            next(err)
        }
    }

    private async recomendations(audioFeatures: SpotifyApi.MultipleAudioFeaturesResponse,
        recentes: SpotifyApi.UsersRecentlyPlayedTracksResponse, userDb: User): Promise<void> {
        try {

            let tracksSeed = recentes.items[0].track.id
            let artistsSeed = recentes.items[1].track.artists[0].id
            let genresSeed = 'brazil,alternative,indie'

            let valenceArr = []
            let energyArr = []

            if (typeof audioFeatures !== 'undefined') {
                for await (const audioFeature of audioFeatures.audio_features) {
                    valenceArr.push(audioFeature.valence)
                    energyArr.push(audioFeature.energy)
                }
            }
            let valenceSeed: SeedCalc = {
                max: Math.max(...valenceArr),
                min: Math.min(...valenceArr),
                avg: Math.round(valenceArr.reduce(function (p, c, i, a) { return p + (c / a.length) }, 0) * 100) / 100
            }

            let energySeed: SeedCalc = {
                max: Math.max(...energyArr),
                min: Math.min(...energyArr),
                avg: Math.round(energyArr.reduce(function (p, c, i, a) { return p + (c / a.length) }, 0) * 100) / 100
            }

            // }
            // console.log(audioFeatures)
            let tracksPlaylist = ''

            const recomendations = await recommendationService.getRecommendations(userDb.acessToken, tracksSeed, artistsSeed, genresSeed, valenceSeed, energySeed)
            for (const iterator of recomendations.tracks) {
                tracksPlaylist += iterator.uri + ','

            }
            tracksPlaylist = tracksPlaylist.slice(0, -1)

            await playlistService.addTracks(userDb.acessToken, '5O2cs2tK6R3ccHozTtv2uB', tracksPlaylist)


        } catch (err) {

        }
    }
}