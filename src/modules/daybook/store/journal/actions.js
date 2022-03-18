import journalAPI from '@/api/journalAPI'


export const loadEntries = async ( { commit }) => {
    const { data } = await journalAPI.get('/entries.json')
    if(!data){
        commit('setEntries', [])
        return
    }
    const entries = []
     
    for( let id of Object.keys( data )){
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}

export const updateEntry = async ( { commit }, entry) =>{
    const { picture, date, text, id } = entry 
    const dataToSave = {date, text, picture}
    await journalAPI.put(`/entries/${id}.json`, dataToSave)
    dataToSave.id = id
    commit('updateEntry', { ...dataToSave })
    
}

export const createEntry = async ( { commit }, entry ) => {
    const { text, date, picture } = entry
    const dataToSave = {date, text, picture}
    const { data } = await journalAPI.post('/entries.json', dataToSave)
    commit('addEntry', {text, date, id: data.name})
    return data.name // id en firebase
}

export const deleteEntry = async ( { commit }, id ) => {
    await journalAPI.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)
}