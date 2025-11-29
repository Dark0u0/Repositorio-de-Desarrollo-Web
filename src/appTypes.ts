export interface AppNavigation {
  toHome: () => Promise<{ success: boolean; error?: string }>;
  toLogin: () => Promise<{ success: boolean; error?: string }>;
  toRegister: () => Promise<{ success: boolean; error?: string }>;
  toPrincipal: () => Promise<{ success: boolean; error?: string }>;
  toAdmin: () => Promise<{ success: boolean; error?: string }>;
  toEditUser: (id: string) => Promise<{ success: boolean; error?: string }>;  
}

export interface Http {
  get: (url: string, options?: any) => Promise<any>;
  post: (url: string, body: any, options?: any) => Promise<any>;
  put: (url: string, body: any, options?: any) => Promise<any>;
}

declare global {
  interface Window {
    appNav: AppNavigation;
    http: Http;
  }
}