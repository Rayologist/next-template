import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/table');
  }, []);
  return null;
};

export default HomePage;
