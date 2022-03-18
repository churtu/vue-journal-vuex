import daybookRouter from '@/modules/daybook/router'

describe( 'Pruebas en el router module del daybook', () => {

    test('El router debe tener esta configuración', async () => {
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any( Function ),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any( Function ),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any( Function ),
                    props: expect.any( Function )
                }
            ]
        })
        // asegurar que se cargle el compoenente correcto
        // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
        const promiseRoutes = []
        //se crea una lista de promesas 
        daybookRouter.children.forEach(child => promiseRoutes.push(child.component()))
        //mapear para tener una lista con los componentes cargados y preguntamos si existe en el arreglo
        const routes = (await Promise.all(promiseRoutes)).map(route => route.default.name)
        expect( routes ).toContain('NoEntrySelected')
        expect( routes ).toContain('EntryView')
    })

    test('Debe retornar el id de la ruta en la ruta entry', () => {
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        // expect((daybookRouter.children[1].props(route))).toEqual({ id: 'ABC-123' })
        const entryRoute = daybookRouter.children.find( route => route.name === 'entry')
        expect(entryRoute.props( route )).toEqual({ id: 'ABC-123' })
    })
})