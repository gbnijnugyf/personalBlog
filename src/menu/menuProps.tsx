import { AppstoreOutlined, BellOutlined, CommentOutlined, DiffOutlined, HomeOutlined, LinkOutlined, RadarChartOutlined, SearchOutlined, SettingOutlined, SmileOutlined, ToolOutlined, UnorderedListOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Avatar, Badge, Dropdown } from "antd"
import { ItemType } from "antd/es/menu/hooks/useItems";

interface ICreateInitMenu {
    frontPath: string,
    length: number
}
function createInitMenu(props: ICreateInitMenu = {
    frontPath: "information",
    length: 3
}) {

    return new Array(props.length).fill(null).map((_, index) => {
        const subKey = props.frontPath + (index + 1);
        return {
            key: subKey,
            label: `${subKey}`,
        };
    })

}

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



const items: ItemType[] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="/personal">
                个人信息
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a rel="noopener noreferrer" href="/login">
                重新登录
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    }
]


export const menuHeaderProps = [
    {
        key: 'detail',
        icon: <HomeOutlined />,
        label: "首页",
    },
    {
        key: 'classify',
        icon: <UnorderedListOutlined />,
        label: "分类",
    },
    {
        key: 'filed',
        icon: <DiffOutlined />,
        label: "归档",
    },
    {
        key: 'about',
        icon: <RadarChartOutlined />,
        label: "关于",
    },
    {
        key: 'friendLink',
        icon: <LinkOutlined />,
        label: "友情链接",
    },
    {
        key: 'search',
        icon: <SearchOutlined />,
        label: "搜索",
    },

]
//首页，分类，归档，关于，友情链接，搜索
export const menuHeaderPropsR = [
    {
        key: 'information',
        icon: <Badge count={5} size="small">
            <BellOutlined style={{ fontSize: '150%' }} /></Badge>,
        label: null,
    },
    {
        key: 'setting',
        icon: <SettingOutlined style={{ fontSize: '150%' }} />,
        label: null,
    },
    {
        key: '',
        icon: (
            <Dropdown
                menu={{ items }}
            >
                <Avatar icon={<UserOutlined style={{ fontSize: '150%' }} />} />
            </Dropdown>
        ),
        label: null,
    }
]

export const menuMainDetailSider = [
    {
        key: 'teach',
        icon: null,
        label: "Cpp",
        children: createInitMenu({
            frontPath: "teach",
            length: 3
        })
    },
    {
        key: 'science',
        icon: null,
        label: "Java",
        children: createInitMenu()
    },
    {
        key: 'profession',
        icon: null,
        label: "Goland",
        children:createInitMenu()
    }
]

export const menuPersonalSider = [
    {
        key: 'personalInfo',
        icon: <UserOutlined />,
        label: '个人信息',
    },
    {
        key: 'setFriendsUser',
        icon: <VideoCameraOutlined />,
        label: '好友信息',
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'nav 3',
    },
]