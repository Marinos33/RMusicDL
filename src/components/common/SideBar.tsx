import { SettingOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collapseSidebar } from '../../redux/UI/slice';
import { RootState } from '../../redux/store';

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
  const collapsed = useSelector(
    (state: RootState) => state.ui.sideBarCollapsed,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCollapse = useCallback(() => {
    dispatch(collapseSidebar());
  }, [dispatch]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => handleCollapse()}
      width={175}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
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
