export default interface IMailWizzRequest {
  get<T>(url: string): Promise<T>;
  delete<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
}
