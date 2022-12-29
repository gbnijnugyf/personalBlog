
export const menuProps = {
    route: {
        path: "/",
        routes: [
            {
                path: "/personal",
                name: "个人界面",
                icon: null,
                // component: mainPage()
                component: 'PersonalPage'
            },
            {
                path: "/w",
                name: "欢ss",
                icon: null,
                // component: mainPage()
                component: "./W"
            },
            {
                path: "/we",
                name: "欢ssd",
                icon: null,
                // component: mainPage()
                component: "./We"
            }        
        ]
    }
}

export const menuHeaderProps = [
    {
        key:'personal',
        icon:null,
        label:"个人信息",
    },
    {
        key:'work',
        icon:null,
        label:"工作大厅",
    },
    {
        key:'3',
        icon:null,
        label:"nav2",
    }
]