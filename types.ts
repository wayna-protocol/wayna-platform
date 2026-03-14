
export interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
  daysLeft: number;
  status: 'active' | 'funded' | 'completed';
  pofBadge: boolean;
  updates: Array<{ date: string; content: string }>;
  createdAt: number;
}

export interface DigitalProduct {
  id: string;
  name: string;
  price: number;
  currency: 'USD' | 'WAFT' | 'USDT' | 'ETH' | 'SOL';
  rating: number;
  image: string;
  category: string;
  author: string;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Page {
  LOGIN = 'login',
  ONBOARDING = 'onboarding',
  HOME = 'home',
  EXPLORE = 'explore',
  WRITE = 'write',
  PROJECT_DETAIL = 'project_detail',
  PRODUCT_DETAIL = 'product_detail',
  REWARDS = 'rewards',
  PROFILE = 'profile',
  WAFT = 'waft',
  CREATE_PROJECT = 'create_project',
  MY_PROJECTS = 'my_projects',
  SELL_PRODUCT = 'sell_product',
  SETTINGS = 'settings'
}
