import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView'
import Swal from 'sweetalert2'

const createVuexStore = ( initialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }    
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))
describe('Pruebas en el EntryView', () => {
    const routerMock = {
        push: jest.fn()
    }
    const store = createVuexStore( journalState )
    store.dispatch = jest.fn() // para escuchar cuando se llama una action desde un componente
    let wrapper
    
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: journalState.entries[0].id
            },
            global:{
                mocks: {
                    $router: routerMock
                },
                plugins: [store]
            }
        })
    })
    test('Debe sacar al usuario por que el id no existe', () => { 
        wrapper = shallowMount( EntryView, {
            global:{
                mocks: {
                    $router: routerMock
                },
                plugins: [store]
            },
            props: {
                id: 'No existe'
            }
        })

        expect( routerMock.push ).toHaveBeenCalledWith({name:'no-entry'})
     })

     test('Debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(routerMock.push).not.toHaveBeenCalled()
     })

     test('Debe de borrar la entrada y salida', async() =>{
         Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true}))
         await wrapper.find('.btn-danger').trigger('click')
         expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Se, estoy seguro'
          })
          expect(routerMock.push).toHaveBeenCalledWith({name: 'no-entry'})
          expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MuvDbLfNDBGis9af7rj')
     })
})