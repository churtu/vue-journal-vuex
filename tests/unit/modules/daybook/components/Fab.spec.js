import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab';
;




describe( 'Fab component', () => {
    
    // test('', () => {
        
    // })

    test('Debe hacer match con el snapshot', () => {
        const wrapper = shallowMount( Fab )
        expect( wrapper.html() ).toMatchSnapshot()
    })
    
    test('Debe mostrar el icono por defecto', () => {
        const wrapper = shallowMount( Fab )
        const fab = wrapper.find( 'i' )
        expect( fab.classes( 'fa-plus' )).toBeTruthy()

    })

    test('Debe mostrar el icono por argumento: fa-circle', () => {
        const wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const fab = wrapper.find( 'i' )
        expect( fab.classes( 'fa-circle' )).toBeTruthy()
    })

    test('Debe emitir el evento on:click cuando se hace click en el boton', () => {
        const wrapper = shallowMount( Fab ) 
        const button = wrapper.find('button')
        button.trigger('click')
        // console.log(wrapper.emitted())
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})