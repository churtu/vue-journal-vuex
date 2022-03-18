import cloudinary from 'cloudinary'
import { uploadImage } from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

cloudinary.config({
    cloud_name: 'dfa6hmaxh',
    api_key: '814792487618376',
    api_secret: 'YqDukbBQDn9v5FTIBW0WYaK7xC8'
})

describe('Pruebas en el uploadImage', () => {

    test('Debe cargar el archivo y retornar el URL', async( done ) => {
        const { data } = await axios.get('https://res.cloudinary.com/dfa6hmaxh/image/upload/v1643838302/c0romgbhcwhbmurbdmys.png', {
            responseType: 'arraybuffer' //para poder decodificar y crear el file
        })

        const file = new File( [data] , 'foto.jpg')
        const url = await uploadImage(file)
        expect( typeof url ).toBe('string')

        // Tomar el id
        const segments = url.split('/')
        const imageId = segments[segments.length-1].replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })
})