interface resultado {
    frase: string,
    type: number
}

class ValenceService {

    public calculaValencia = async (audioFeatures: SpotifyApi.MultipleAudioFeaturesResponse): Promise<resultado> => {

        let valenceMedia = 0
        audioFeatures.audio_features.forEach((element: { valence: number; }) => {
            valenceMedia += element.valence
        });

        valenceMedia = valenceMedia / audioFeatures.audio_features.length
        // 
        let shrekao = {
            frase: '',
            type: 0
        }
        if (valenceMedia == 0)
            shrekao.frase = 'Não foi possível determinar seu shrekness'//, shrekao.image = 'https://files.nsctotal.com.br/styles/paragraph_image_style/s3/imagesrc/19467670.jpg?qr1o4vY_hiIfLOo.ByZ_VlTj5YwnA.zH&itok=FAVEdsPc'

        else if (valenceMedia > 0 && valenceMedia < 0.25)
            shrekao.frase = 'As coisas não vão muito bem ai né?', shrekao.type = 1 //shrekao.image = 'https://i.ytimg.com/vi/pDwVHvTvZGk/maxresdefault.jpg'
        else if (valenceMedia >= 0.25 && valenceMedia < 0.50)
            shrekao.frase = 'Relaxa meu consagrado, as coisas vão melhorar', shrekao.type = 2 //shrekao.image = 'https://i.ytimg.com/vi/psFzJv8g6jc/maxresdefault.jpg'
        else if (valenceMedia >= 0.50 && valenceMedia < 0.75)
            shrekao.frase = 'Mó paz', shrekao.type = 3 //shrekao.image = 'https://s2.glbimg.com/4XA_kCAH1gCp60Ue60g-tBSOpuA=/607x350/smart/e.glbimg.com/og/ed/f/original/2018/05/18/shrek.jpg'
        else
            shrekao.frase = 'Se melhorar estraga', shrekao.type = 4 //shrekao.image = 'https://s.yimg.com/uu/api/res/1.2/AswZkqvI6WCQ5k03h_PnDg--~B/aD0zMDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/es/tomatazos_56/632614b7918d69420b6b7c14d487c320'

        return shrekao
    }

}

export const valenceService = new ValenceService()