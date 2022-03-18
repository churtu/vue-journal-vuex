import { shallowMount } from '@vue/test-utils'
import About from '@/views/About'


describe('About view', () => {

    test('Debe renderizar el componente correctamente', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot()
    })

    
})