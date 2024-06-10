'use client'
import Posts from './post/posts';
import { AuthProvider } from './context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <div>
        <Posts />
      </div>
    </AuthProvider>
  );
}
