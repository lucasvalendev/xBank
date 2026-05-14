import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

type MockHandler = (
  config: AxiosRequestConfig,
) => Promise<{ data: unknown; status?: number }>

const mockRoutes: { method: string; url: string; handler: MockHandler }[] = []

export function registerMock(
  method: "get" | "post",
  url: string,
  handler: MockHandler,
) {
  mockRoutes.push({ method, url, handler })
}

function mockAdapter(config: AxiosRequestConfig): Promise<AxiosResponse> {
  const method = (config.method ?? "get").toLowerCase()
  const url = config.url ?? ""

  const match = mockRoutes.find(
    (route) => route.method === method && url.endsWith(route.url),
  )

  if (match) {
    return match.handler(config).then((result) => ({
      data: result.data,
      status: result.status ?? 200,
      statusText: "OK",
      headers: {},
      config: config as AxiosRequestConfig & { headers: never },
    })) as Promise<AxiosResponse>
  }

  return Promise.reject(new Error(`No mock registered for ${method} ${url}`))
}

export const http = axios.create({
  baseURL: "/api",
  timeout: 8000,
  adapter: mockAdapter,
})
