import { SettingOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;

const navItems = [
  {
    key: 'playlists',
    icon: (
      <CustomerServiceOutlined
        style={{
          fontSize: '2em',
        }}
      />
    ),
    label: 'Playlists',
  },
  {
    key: 'settings',
    icon: (
      <SettingOutlined
        style={{
          fontSize: '2em',
        }}
      />
    ),
    label: 'Settings',
  },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* TODO replace with logo */}
      <Header style={{ backgroundColor: 'green', width: '100%' }}>
        <div />
      </Header>
      <Divider />
      <Menu
        theme="dark"
        defaultSelectedKeys={['playlists']}
        onClick={(e) => navigate(e.key)}
        items={navItems}
        mode="inline"
      />
    </Sider>
  );
};

export default SideBar;
