import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Switch, ConfigProvider } from 'antd';
import { darkTheme, lightTheme, darkColors, lightColors } from '../../constants';
import './main.css';
import { ColorDemo } from '../../components';

const { Header, Sider, Content } = Layout;

// Menu items with child menus
const menuItems = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    label: 'User Management',
    children: [
      {
        key: '1',
        icon: <UserOutlined />,
        label: 'Profile',
      },
      {
        key: '2',
        icon: <SettingOutlined />,
        label: 'Settings',
      },
    ],
  },
  {
    key: 'sub2',
    icon: <VideoCameraOutlined />,
    label: 'Media',
    children: [
      {
        key: '3',
        icon: <VideoCameraOutlined />,
        label: 'Videos',
      },
      {
        key: '4',
        icon: <UploadOutlined />,
        label: 'Uploads',
      },
    ],
  },
  {
    key: 'sub3',
    icon: <AppstoreOutlined />,
    label: 'Applications',
    children: [
      {
        key: '5',
        icon: <DatabaseOutlined />,
        label: 'Data Manager',
      },
      {
        key: '6',
        icon: <SettingOutlined />,
        label: 'App Settings',
      },
    ],
  },
  {
    key: '7',
    icon: <UploadOutlined />,
    label: 'Reports',
  },
];

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  const colors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="main-layout" >
  <ConfigProvider theme={currentTheme}>
      <Layout  style={{ minHeight: '100%' }}>
        <Sider
          style={{ backgroundColor: colors.background.surface }}
          width={300}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo-card">
            <div className="loc-icon">
              <img
                src={
                  'https://cdn-icons-png.flaticon.com/512/684/684908.png'
                }
                alt="Location Logo"
                loading="lazy"
              />
            </div>
            <div className="loc-text">
              <div
                className="loc-title"
                style={{ color: colors.text.primary }}
              >
                Name
              </div>
              <div
                className="loc-sub"
                style={{ color: colors.text.secondary }}
              >
                Description
              </div>
            </div>
          </div>
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 24px',
              background: colors.background.surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              // borderBottom: `1px solid ${colors.borders}`,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: colors.text.primary,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              
            </div>
          </Header>
          <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: colors.background.base,
                borderRadius: 8,
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 'calc(100vh - 64px - 48px)', // viewport height - header height - margins
                flex: 1,
              }}
            >
              <ColorDemo isDarkMode={isDarkMode} />
            </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
    </div>
  );
};

export default Main;