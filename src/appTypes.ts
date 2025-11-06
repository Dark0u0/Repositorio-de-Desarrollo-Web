export interface AppNavigation {
  toHome: () => Promise<{ success: boolean; error?: string }>;
  toLogin: () => Promise<{ success: boolean; error?: string }>;
}

export interface Http {
  get: (url: string, options?: any) => Promise<any>;
  post: (url: string, payload: any, options?: any) => Promise<any>;
}

declare global {
  interface Window {
    appNav: AppNavigation;
    http: Http;
  }
}