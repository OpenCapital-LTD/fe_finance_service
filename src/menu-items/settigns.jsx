
const settings_menu = {
    items: [
        {
            title: 'User Management ',
            children: [
                {
                    title: 'Users',
                    url: '/users',
                }, {
                    title: 'Country Office',
                    url: '/office',
                },  {
                    title: 'Roles',
                    url: '/roles',
                }
            ]
        },
        {
            title: 'Fields',
            children: [
                {
                    title: 'Categories',
                    url: '/category',
                }, {
                    title: 'Projects',
                    url: '/',
                }, {
                    title: 'Custom Fields',
                    url: '/',
                }
            ]
        },{
            title: 'POLICIES',
            children: [
                {
                    title: 'Approval flow',
                    url: '/',
                }, {
                    title: 'Expense rules',
                    url: '/expense_rules',
                }, {
                    title: 'Reject Reasons',
                    url: '/',
                }
            ]
        },
    ]
};

export default settings_menu