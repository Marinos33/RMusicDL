import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
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

  {
    /*const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
      </div>
      );*/
  }
}

export default App;
