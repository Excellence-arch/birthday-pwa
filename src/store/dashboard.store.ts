// src/store/useDashboardStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface Stat {
  title: string;
  value: number;
}

interface UpcomingEvent {
  name: string;
  date: string;
  daysLeft: number;
  relation: string;
}

interface Activity {
  message: string;
  icon: 'birthday' | 'gift' | 'calendar';
  color: string;
  timeAgo: string;
}

interface DashboardState {
  stats: Stat[];
  upcomingEvents: UpcomingEvent[];
  recentActivity: Activity[];
  loading: boolean;
  loaded: boolean;
  error: any | null;
  fetchDashboard: () => Promise<void>;
}

// Updated useDashboardStore
export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: [],
  upcomingEvents: [],
  recentActivity: [],
  loading: false,
  loaded: false,
  error: null,
  fetchDashboard: async () => {
    if (get().loaded) return;

    set({ loading: true });

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if(res.status === 401) {
        // Handle unauthorized access
        console.error('Unauthorized access - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to login page
        return;
      }

      // console.log(res);
      const { stats = [], upcomingEvents = [], recentActivity = [] } = res.data;

      set({
        stats,
        upcomingEvents,
        recentActivity: recentActivity.map((item: any) => ({
          message: item.message,
          icon: item.type,
          color: item.color,
          timeAgo: item.timeAgo,
        })),
        loading: false,
        loaded: true,
        error: null,
      });
    } catch (err: any) {
      console.error('Error fetching dashboard:', err);
      set({ loading: false, error: err });
    }
  },
}));