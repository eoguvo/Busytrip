import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authAtom } from '../atoms';
import api from '../services/api';

export { useUserActions };

export interface LoginPayload {
  password: string,
  email: string
}

export interface RegisterPayload {
  password: string,
  email: string
}

function useUserActions() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

  return {
    login,
    logout,
    create
  }

  async function login(body: LoginPayload) {
    try {
      const { data: response } = await api.post('/auth/login', body);
      localStorage.setItem('auth', JSON.stringify(response.token));
      setAuth(response.token);
      return response;
    } catch (e: any) {
      throw e.response.data;
    }
  }

  function logout(cb: Function) {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('auth');
    setAuth('');
    navigate('/');
    cb()
  }

  async function create(body: RegisterPayload) {
    try {
      const { data: response } = await api.post('/user', body);
      localStorage.setItem('auth', JSON.stringify(response.token));
      setAuth(response.token);
      return response;
    } catch (e: any) {
      throw e.response.data;
    }
  }
}
