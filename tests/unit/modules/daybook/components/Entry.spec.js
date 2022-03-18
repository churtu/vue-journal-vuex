import { shallowMount } from '@vue/test-utils'
import { journalState } from '../../../mock-data/test-journal-state'

import Entry from '@/modules/daybook/components/Entry'

describe('Pruebas en el Entry component', () => {
    //mock router
    const mockRouter = {
        push: jest.fn()
    }
    // wrapper, con props y global para configurar el router
    const wrapper = shallowMount(Entry, {
        props:{
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('Debe hacer match con el Snapshot', () => { 
        expect(wrapper.html()).toMatchSnapshot()
     })

    test('Debe de direccionar al hacer click en el .entry-container', () => { 
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        })
     })

    test('Pruebas en las propiedades computadas', () => {
        expect( typeof wrapper.vm.day ).toBe('number')
        expect( typeof wrapper.vm.month ).toBe('string')
        expect( typeof wrapper.vm.yearDate ).toBe('string')
    })
})