
export default {
    name: 'daybook',
    component: () => import(/* webpackChunkName: "Daybook" */ '@/modules/daybook/layout/DaybookLayout'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "No-entry" */ '@/modules/daybook/views/NoEntrySelected'),
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "Entry" */ '@/modules/daybook/views/EntryView'),
            
        }
    ]
}