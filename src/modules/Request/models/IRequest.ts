/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IRequest {
  get<T>(url: string, params?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
}
