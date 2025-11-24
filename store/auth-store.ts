import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tokens {
  access: string;
  refresh: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setTokens: (tokens: Tokens) => Promise<void>;
  setUser: (user: User) => void;
  clearAuth: () => Promise<void>;
  loadTokensFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,

  setTokens: async ({ access, refresh }) => {
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  setUser: user => set({ user }),

  clearAuth: async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);

    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  loadTokensFromStorage: async () => {
    try {
      const [accessToken, refreshToken] = await AsyncStorage.multiGet([
        'accessToken',
        'refreshToken',
      ]);

      if (accessToken[1] && refreshToken[1]) {
        set({
          accessToken: accessToken[1],
          refreshToken: refreshToken[1],
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar tokens:', error);
    }
  },
}));
