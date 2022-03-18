import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'


describe('Home view', () => {

    test('Debe renderizar el componente correctamente', () => {
        const wrapper = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Hacer click en un boton debe renderizar a no-entry', () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
        
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
    })  
    
})