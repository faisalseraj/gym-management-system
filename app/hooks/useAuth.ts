// hooks/useAuth.js
import { signIn, signOut, useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return {
    session,
    loading,
    signIn,
    signOut,
  };
};
