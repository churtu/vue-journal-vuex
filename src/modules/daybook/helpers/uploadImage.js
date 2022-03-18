import axios from "axios"


const uploadImage = async ( file ) => {
    if( !file ) return
    try {
        const formData = new FormData()
        formData.append('upload_preset', 'curso-vue')
        formData.append('file', file)
        const url = `https://api.cloudinary.com/v1_1/dfa6hmaxh/image/upload`
        const { data } = await axios.post(url, formData)
        return data.secure_url
    } catch (error) {
        console.error('Error al cargar imagen');
        console.log(error);

        return null
    }
}

const destroyImage = async ( file ) => {
    if( !file ) return
    try {
        const url = `https://api.cloudinary.com/v1_1/dfa6hmaxh/${file}/destroy`
        const { data } = await axios.post(url)
        console.log(data);
    } catch (error) {
        console.error('Error al cargar imagen');
        console.log(error);

        return null
    }
}

export {
    uploadImage,
    destroyImage
} 