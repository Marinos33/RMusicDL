import { SettingOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { collapseSidebar } from '../../redux/UI/slice';
import { RootState } from '../../redux/store';
import { ExtentedThemeConfig } from '../../theme';
import styled from 'styled-components';

const { useToken } = theme;

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

const StyledSider = styled(Sider)<{ triggerColor: string }>`
  .ant-layout-sider-trigger {
    background-color: ${(props) => props.triggerColor};
  }
`;

const SideBar = () => {
  const collapsed = useSelector(
    (state: RootState) => state.ui.sideBarCollapsed,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token }: ExtentedThemeConfig = useToken();

  const handleCollapse = useCallback(() => {
    dispatch(collapseSidebar());
  }, [dispatch]);

  return (
    <StyledSider
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
        backgroundColor: token.sideBarColor,
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      triggerColor={token.colorPrimary}
    >
      {/* TODO replace with logo */}
      <Header style={{ backgroundColor: 'green', width: '100%' }}>
        <div />
      </Header>
      <Menu
        theme="dark"
        defaultSelectedKeys={['playlists']}
        onClick={(e) => navigate(e.key)}
        items={navItems}
        mode="inline"
        style={{ backgroundColor: token.sideBarColor }}
      />
    </StyledSider>
  );
};

export default SideBar;
