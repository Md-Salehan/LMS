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
import { Button, Layout, Menu, Switch, ConfigProvider, Flex, Typography, Card, Avatar } from 'antd';
import { darkTheme, lightTheme, darkColors, lightColors } from '../../constants';
import './main.css';
import { ColorDemo } from '../../components';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  const colors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="main-layout">
      <ConfigProvider theme={currentTheme}>
        <Layout style={{ minHeight: '100%' }}>
          <Sider
            style={{ backgroundColor: colors.background.surface }}
            width={300}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <Card
              className="logo-card"
              styles={{
                body: {
                  padding: 14,
                },
              }}
              style={{
                margin: 16,
                backgroundColor: isDarkMode ? '#0b2540' : '#e6f4ff',
                border: isDarkMode ? '1px solid #1e3a5f' : '1px solid #bae0ff',
                borderRadius: 12,
                transition: 'all 0.3s ease',
              }}
            >
              <Flex align="center" gap={12}>
                <Avatar
                  size={40}
                  shape="square"
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  style={{
                    backgroundColor: isDarkMode ? '#ffffff' : '#1677ff',
                    borderRadius: 8,
                  }}
                />
                <Flex vertical gap={2}>
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      color: isDarkMode ? '#ffffff' : '#1f1f1f',
                    }}
                  >
                    Name
                  </Title>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 12,
                      color: isDarkMode ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.45)',
                    }}
                  >
                    Description
                  </Text>
                </Flex>
              </Flex>
            </Card>
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
                height: 'calc(100vh - 64px - 48px)',
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