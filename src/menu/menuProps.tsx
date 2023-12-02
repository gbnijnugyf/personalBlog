import {
  AppstoreOutlined,
  BellOutlined,
  CommentOutlined,
  DiffOutlined,
  DownOutlined,
  HomeOutlined,
  LinkOutlined,
  RadarChartOutlined,
  SearchOutlined,
  SettingOutlined,
  SmileOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";

interface ICreateInitMenu {
  frontPath: string;
  length: number;
}
function createInitMenu(
  props: ICreateInitMenu = {
    frontPath: "information",
    length: 3,
  }
) {
  return new Array(props.length).fill(null).map((_, index) => {
    const subKey = props.frontPath + (index + 1);
    return {
      key: subKey,
      label: `${subKey}`,
    };
  });
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
        component: "PersonalPage",
      },
      {
        path: "/w",
        name: "欢ss",
        icon: null,
        // component: mainPage()
        component: "./W",
      },
      {
        path: "/we",
        name: "欢ssd",
        icon: null,
        // component: mainPage()
        component: "./We",
      },
    ],
  },
};

export const menuHeaderRItems: ItemType[] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/admin/login">
        管理员登录
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href="/setting">
        设置
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
];

export const menuHeaderProps = [
  {
    key: "detail",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "classify",
    icon: <UnorderedListOutlined />,
    label: "分类",
  },
  {
    key: "filed",
    icon: <DiffOutlined />,
    label: "归档",
  },
  {
    key: "about",
    icon: <RadarChartOutlined />,
    label: "关于",
  },
  {
    key: "friendLink",
    icon: <LinkOutlined />,
    label: "友情链接",
  },
  {
    key: "search",
    icon: <SearchOutlined />,
    label: "搜索",
  },
];
//首页，分类，归档，关于，友情链接，搜索
export const menuHeaderPropsR = [
  {
    key: "setting",
    icon: (
      <Dropdown menu={{ items: menuHeaderRItems }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
    label: null,
  },
];

export const menuMainDetailSider = [
  {
    key: "teach",
    icon: null,
    label: "Cpp",
    children: createInitMenu({
      frontPath: "teach",
      length: 3,
    }),
  },
  {
    key: "science",
    icon: null,
    label: "Java",
    children: createInitMenu(),
  },
  {
    key: "profession",
    icon: null,
    label: "Goland",
    children: createInitMenu(),
  },
];

export const menuPersonalSider = [
  {
    key: "personalInfo",
    icon: <UserOutlined />,
    label: "个人信息",
  },
  {
    key: "setFriendsUser",
    icon: <VideoCameraOutlined />,
    label: "好友信息",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3",
  },
];
