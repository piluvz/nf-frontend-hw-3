'use client'
import Posts from './post/posts';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './login/page';
import { useRouter } from 'next/navigation';


const Page: React.FC = () => {
  const router = useRouter();
  const {token} = useAuth();
  return token ? <Posts /> : router.push('/login')
  // <Posts /> : <LoginPage />
}

const App: React.FC = () => {
  return(
      <Page />
  )
}

export default App;