import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div />
      <Header style={{ padding: 0 }}>
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined
                style={{
                  fontSize: '30px',
                  color: 'white',
                }}
              />
            ) : (
              <MenuFoldOutlined
                style={{
                  fontSize: '30px',
                  color: 'white',
                }}
              />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['playlists']}
        onClick={(e) => navigate(e.key)}
        items={[
          {
            key: 'playlists',
            icon: (
              <CustomerServiceOutlined
                style={{
                  fontSize: '30px',
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
                  fontSize: '30px',
                }}
              />
            ),
            label: 'Settings',
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
