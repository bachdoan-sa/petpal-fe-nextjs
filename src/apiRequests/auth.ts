import http from '@/src/lib/http'
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType
} from '@/src/schemaValidations/auth.schema'
import { MessageResType } from '@/src/schemaValidations/common.schema'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/api/v1/auth/login', body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>('/api/v1/auth/register', body),
  auth: (body: { sessionToken: string; sessionRole: string ; expiresAt: string }) =>
    http.post('/api/auth', body, {
      baseUrl: ''
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      '/api/auth/logout',
      {
        force
      },
      {
        baseUrl: '',
        signal
      }
    ),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      '/auth/slide-session',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      '/api/auth/slide-session',
      {},
      { baseUrl: '' }
    )
}

export default authApiRequest