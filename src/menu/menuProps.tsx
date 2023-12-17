import {
  CopyOutlined,
  DownOutlined,
  HomeOutlined,
  LinkOutlined,
  LogoutOutlined,
  MessageOutlined,
  RadarChartOutlined,
  SmileOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
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

export interface IMenuProps {
  key: string;
  icon: JSX.Element;
  label: string;
  children?: { key: string; label: string }[];
}

export function dynamicMenuHeaderProps(
  props: { key: string; label: string }[]
): IMenuProps[] {
  let tempMenu: IMenuProps[] = menuHeaderProps;
  if (tempMenu.findIndex((item) => item.key === "classify") === -1) {
    tempMenu.push({
      key: "classify",
      icon: <UnorderedListOutlined />,
      label: "分类",
      children: props,
    });
  }

  return tempMenu;
}
export const menuHeaderProps = [
  {
    key: "detail",
    icon: <HomeOutlined />,
    label: "首页",
  },
  // {
  //   key: "filed",
  //   icon: <DiffOutlined />,
  //   label: "归档",
  // },
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
];
//首页，分类，归档，关于，友情链接，搜索
// export const menuHeaderPropsR = [
//   {
//     key: "setting",
//     icon: <UserSwitchOutlined />,
//     label: null,
//   },
// ];

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

export const menuAdminSider = [
  {
    key: "article",
    icon: <CopyOutlined />,
    label: "文章管理",
  },
  {
    key: "comment",
    icon: <MessageOutlined  />,
    label: "评论/留言管理",
  },
  {
    key: "friendLink",
    icon: <LinkOutlined />,
    label: "友情链接管理",
  },
  {
    key: "loginout",
    icon: <LogoutOutlined />,
    label: "登出",
  },
];
