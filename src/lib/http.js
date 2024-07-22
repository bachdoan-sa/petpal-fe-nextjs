import envConfig from "../config"
import { normalizePath } from "./utils"
import { redirect } from "next/navigation"

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

export class HttpError extends Error {
  constructor({ status, payload }) {
    super("Http Error")
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  constructor({ status, payload }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

let clientLogoutRequest = null
export const isClient = () => typeof window !== "undefined"
const request = async (method, url, options) => {
  let body = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }
  const baseHeaders =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json"
        }
  if (isClient()) {
    const sessionToken = localStorage.getItem("sessionToken")
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl

  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
  })
  const payload = await res.json()
  const data = {
    status: res.status,
    payload
  }
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data)
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders
            }
          })
          try {
            await clientLogoutRequest
          } catch (error) {
          } finally {
            localStorage.removeItem("sessionToken")
            localStorage.removeItem("sessionTokenExpiresAt")
            clientLogoutRequest = null
            location.href = "/login"
          }
        }
      } else {
        const sessionToken = options?.headers?.Authorization.split("Bearer ")[1]
        redirect(`/logout?sessionToken=${sessionToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (isClient()) {
    if (
      ["/login", "/register"].some(item => item === normalizePath(url))
    ) {
      const { token, expiresAt } = payload.data
      localStorage.setItem("sessionToken", token)
      localStorage.setItem("sessionTokenExpiresAt", expiresAt)
    } else if ("auth/logout" === normalizePath(url)) {
      localStorage.removeItem("sessionToken")
      localStorage.removeItem("sessionTokenExpiresAt")
    }
  }
  return data
}

const http = {
  get(url, options) {
    return request("GET", url, options)
  },
  post(url, body, options) {
    return request("POST", url, { ...options, body })
  },
  put(url, body, options) {
    return request("PUT", url, { ...options, body })
  },
  delete(url, options) {
    return request("DELETE", url, { ...options })
  }
}

export default http
