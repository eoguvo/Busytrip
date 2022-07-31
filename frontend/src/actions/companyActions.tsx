import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { authAtom } from '../atoms';
import { ICompany } from '../components/Feed/interface';
import api from '../services/api';

export { useCompanyActions };

export interface LoginPayload {
  password: string,
  email: string
}

export interface RegisterPayload {
  password: string,
  email: string
}

function useCompanyActions() {

  return {
    getAll,
    getById
  }

  async function getAll() {
    try {
      const { data: response } = await api.get<ICompany[]>('/company');
      return response;
    } catch (e: any) {
      throw e.data.response.data;
    }
  }

  interface getByIdProps {
    queryKey: QueryKey
  }
  async function getById({ queryKey }: getByIdProps): Promise<ICompany> {
    const [, id] = queryKey
    try {
      const { data: response } = await api.get<ICompany>(`/company/${id}`);
      return response;
    } catch (e: any) {
      throw e.response.data;
    }
  }
}
