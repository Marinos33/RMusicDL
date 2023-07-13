import { useEffect } from 'react';
import SideBar from './components/common/SideBar';
import { Layout, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { ExtentedThemeConfig } from './theme';
const { useToken } = theme;

function App() {
  const navigate = useNavigate();
  const { token }: ExtentedThemeConfig = useToken();

  useEffect(() => {
    navigate('playlists');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: token.colorBgContainer,
      }}
    >
      <SideBar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default App;
