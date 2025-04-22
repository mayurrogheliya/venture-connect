import { usersAPI } from './api/endpoints/users';
import AppRouters from './routes';
import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';

function App() {
  const { setUser, userId } = useUserStore();
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await usersAPI.getUser(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, [setUser, userId]);
  return <AppRouters />;
}

export default App;
