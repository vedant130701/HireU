// assets
import { DashboardOutlined, HomeOutlined, DollarCircleOutlined, LogoutOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  LogoutOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.HomeOutlined,
      breadcrumbs: false
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'grants',
      title: 'Grants',
      type: 'item',
      url: '/grants',
      icon: icons.DollarCircleOutlined,
      breadcrumbs: false
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/login',
      icon: icons.LogoutOutlined,
      breadcrumbs: false,
      onClick: () => {
        console.log('Logout');
        localStorage.removeItem('isAuthenticated');
      }
    }
  ]
};

export default dashboard;
