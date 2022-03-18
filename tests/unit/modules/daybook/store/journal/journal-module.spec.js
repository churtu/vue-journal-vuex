import {
    createStore
} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import {
    journalState
} from '../../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            // Se reemplaza el state por el que viene por parametro
            state: {
                ...initialState
            }
        },
    }
})

describe('Vuex - Pruebas en el modulo del Journal', () => {

    test('este es el estado inicial, debe de tener este state', () => {
        const store = createVuexStore(journalState) // Se envia un state (mock)para probar 

        const {
            isLoading,
            entries
        } = store.state.journal

        expect(isLoading).toBe(false)
        expect(entries).toEqual(journalState.entries)
    })

    // Mutations
    test('mutation: setEntries', () => {
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.isLoading).toBe(false)
    })

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const storeEntries = store.state.journal.entries

        const updatedEntry = {
            "id": "-MuvDbLfNDBGis9af7rj",
            "date": 1643818274611,
            "text": "Soy un regostro actualizado desde las pruebas hacia el store"
        }

        store.commit('journal/updateEntry', updatedEntry)

        // se espera que existan 3 registros
        expect(storeEntries.length).toBe(3)

        // se espera que exista el objeto
        expect(storeEntries).toContainEqual(updatedEntry)
    })

    test('mutations: addEntry, deleteEntry', () => {

        const store = createVuexStore(journalState)
        const entry = {
            id: 'ABC-123',
            text: 'Hola mundo'
        }
        
        store.commit('journal/addEntry', entry)
        expect(store.state.journal.entries.length).toBe(4)
        expect(store.state.journal.entries.find(e => e.id = entry.id)).toEqual(entry)

        store.commit('journal/deleteEntry', entry.id)
        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.entries).not.toContainEqual(entry)
    })

    // Getters

    test('getters: getEntriesByTerm getEntryById', () => {
        const store = createVuexStore( journalState )
        const [ e1, e2, e3 ] = store.state.journal.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(3)
        expect(store.getters['journal/getEntriesByTerm']('store').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('store')).toEqual([ e1 ])

        expect(store.getters['journal/getEntryById'](e3.id)).toEqual( e3 )
    })
    
    // Actions

    test('Actions: loadEntries', async() => {
        const store = createVuexStore({
            isLoading: true,
            entries: []
        })

        await store.dispatch('journal/loadEntries')
        
        expect(store.state.journal.entries.length).not.toBe(0)
    })
    
    test('Actions: updateEntry', async() => {
        const store = createVuexStore( journalState )

        const updatedEntry = {
            id : "-MuvDbLfNDBGis9af7rj", // Debe existir en la bbdd
            date : 1643818274611,
            text : "probando el updateEntry",
            campo: 'Hola',
            otro: 123,
            gatochico:{action: null}
          }
          await store.dispatch('journal/updateEntry', updatedEntry)
          expect(store.state.journal.entries.length).toBe(3)
          expect(store.state.journal.entries.find( e => e.id === updatedEntry.id)).toEqual({
            id : "-MuvDbLfNDBGis9af7rj", // Debe existir en la bbdd
            date : 1643818274611,
            text : "probando el updateEntry",
          })
    })

    test('Actions: createEntry deleteEntry', async() =>  {
        
        // crear store
        const store = createVuexStore( journalState )
        const newEntry = { date: 1643818274611, text: 'nueva entrada desde las pruebas' }
        //dispatch de la accion create entry
        //obtener el id de la nueva entrada
        const newID = await store.dispatch('journal/createEntry', newEntry)
        //el id debe ser un string
        expect( typeof newID ).toBe( 'string' )
        //la nueva entrada debe de existir en el state.journal.entries
        expect(store.state.journal.entries.find( e => e.id === newID)).toBeTruthy()

        //dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', newID)
        ////la nueva entrada no debe de existir en el state.journal.entries
        expect(store.state.journal.entries.find( e => e.id === newID)).toBe(undefined)
        expect(store.state.journal.entries.find( e => e.id === newID)).toBeFalsy()
    })
})