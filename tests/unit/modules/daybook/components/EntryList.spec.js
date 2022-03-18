import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { journalState } from '../../../mock-data/test-journal-state'
// import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import EntryList from '@/modules/daybook/components/EntryList'

import journal from '@/modules/daybook/store/journal'

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: initialState
        }
    }
})

describe('Pruebas en el EntryList', () => {

    // const journalMockModule = {
    //     namespaced: true,
    //     getters:{
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }
    // const store = createStore({
    //     modules: {
    //         journal: { ...journalMockModule }
    //     }
    // })

    // const wrapper = shallowMount(EntryList, {
    //     global: {
    //         mocks: {
    //             $router: routerMock
    //         },
    //         plugins: [ store ]
    //     },
    // })

    const routerMock = {
        push: jest.fn()
    }

    const store = createVuexStore( journalState )

    let wrapper 

    beforeEach(() => {
        // Se reinicializa cada vez que se termina una prueba
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: routerMock
                },
                plugins: [ store ]
            }
        })
    })
    test('Debe llamar al entrylistbyterm y mostrar las 3 entradas', () => { 
        expect( wrapper.findAll('entry-stub').length ).toBe(3)
        expect( wrapper.html ).toMatchSnapshot()
     })

     test('Debe de llamar el getEntriesByTerm y filtrar las entradas', async() => {
         const input = wrapper.find('input')
         await input.setValue('Soy un mock')
         expect(wrapper.findAll('entry-stub').length).toBe(1)
     })

     test('el boton de nuevo debe direccionar a /new', () => {
         wrapper.find('button').trigger('click')
         expect(routerMock.push).toHaveBeenCalledWith({
             name:'entry', params: {id: 'new'}
         })
     })
})