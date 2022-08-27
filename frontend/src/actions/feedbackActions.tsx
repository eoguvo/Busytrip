import { QueryKey } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../atoms';
import { ICompany } from '../components/Feed/interface';
import api from '../services/api';

export { useFeedbackActions };

export interface FeedbackPayload {
  _id: string,
  company_id: string,
  ratings: number,
  body: string,
  createdAt: string
}

function useFeedbackActions() {
  const auth = useRecoilValue(authAtom);

  return {
    create,
    getByCompanyId
  }

  async function create(body: FeedbackPayload) {
    try {
      const { data: response } = await api.post('/feedback', body, {
        headers: {
          "Authorization": `Bearer ${auth}`
        }
      });
      return response;
    } catch (e: any) {
      console.log(e)
      throw e.response.data;
    }
  }

  interface getByIdProps {
    queryKey: QueryKey
  }

  interface ResponsePayload {
    _id: string,
    "company_id": string,
    "user_id": string,
    "ratings": number,
    "body": string,
    createdAt: string,
    "user": {
      "name": string
    }
  }
  async function getByCompanyId({ queryKey }: getByIdProps): Promise<ResponsePayload[]&{status?: number}> {
    const [, id] = queryKey
    try {
      const { data, status } = await api.get<ResponsePayload[]>(`/feedback/${id}`);
      const response = status === 204 ? {...data, status} : data;
      return response;
    } catch (e: any) {
      console.log(e)
      throw e.response.data;
    }
  }
}
