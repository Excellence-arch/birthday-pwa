import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface Birthday {
  _id: string;
  name: string;
  phone: string;
  dob: string; // ISO date string
  createdAt: string;
}

interface BirthdayState {
  birthdays: Birthday[];
  upcomingBirthdays: Birthday[];
  otherBirthdays: Birthday[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchBirthdays: () => Promise<void>;
  addBirthday: (birthday: Omit<Birthday, '_id' | 'createdAt'>) => Promise<void>;
  updateBirthday: (id: string, updates: Partial<Birthday>) => Promise<void>;
  deleteBirthday: (id: string) => Promise<void>;
  searchBirthdays: (term: string) => Birthday[];
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

export const useBirthdayStore = create<BirthdayState>()(
  persist(
    (set, get) => ({
      birthdays: [],
      upcomingBirthdays: [],
      otherBirthdays: [],
      loading: false,
      loaded: false,
      error: null,
      lastFetched: null,

      fetchBirthdays: async () => {
        const { loaded, lastFetched } = get();
        const now = Date.now();

        // Return if data is fresh
        if (loaded && lastFetched && now - lastFetched < CACHE_DURATION) {
          return;
        }

        set({ loading: true, error: null });

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/birthdays`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          const birthdays = response.data;
          const today = new Date();

          // Process birthdays to separate upcoming ones
          const upcoming = birthdays
            .filter((b: Birthday) => {
              const bday = new Date(b.dob);
              return (
                bday.getMonth() === today.getMonth() &&
                bday.getDate() >= today.getDate()
              );
            })
            .sort((a: Birthday, b: Birthday) => {
              const aDate = new Date(a.dob);
              const bDate = new Date(b.dob);
              return aDate.getDate() - bDate.getDate();
            });

          const others = birthdays
            .filter((b: Birthday) => !upcoming.some((u: { _id: string; }) => u._id === b._id))
            .sort((a: Birthday, b: Birthday) => {
              const aDate = new Date(a.dob);
              const bDate = new Date(b.dob);
              return (
                aDate.getMonth() - bDate.getMonth() ||
                aDate.getDate() - bDate.getDate()
              );
            });

          set({
            birthdays,
            upcomingBirthdays: upcoming,
            otherBirthdays: others,
            loading: false,
            loaded: true,
            lastFetched: Date.now(),
          });
        } catch (error) {
          console.error('Error fetching birthdays:', error);
          set({
            error: 'Failed to fetch birthdays',
            loading: false,
          });
        }
      },

      addBirthday: async (birthday) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/birthdays`, birthday, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          set((state) => {
            const newBirthday = response.data;
            const newBirthdays = [...state.birthdays, newBirthday];

            // Re-process to update upcoming/other birthdays
            const today = new Date();
            const upcoming = newBirthdays
              .filter((b) => {
                const bday = new Date(b.dob);
                return (
                  bday.getMonth() === today.getMonth() &&
                  bday.getDate() >= today.getDate()
                );
              })
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return aDate.getDate() - bDate.getDate();
              });

            const others = newBirthdays
              .filter((b) => !upcoming.some((u) => u._id === b._id))
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return (
                  aDate.getMonth() - bDate.getMonth() ||
                  aDate.getDate() - bDate.getDate()
                );
              });

            return {
              birthdays: newBirthdays,
              upcomingBirthdays: upcoming,
              otherBirthdays: others,
            };
          });
        } catch (error) {
          console.error('Error adding birthday:', error);
          throw error;
        }
      },

      updateBirthday: async (id, updates) => {
        try {
          await axios.put(
            `${import.meta.env.VITE_BASE_URL}/birthdays/${id}`,
            updates,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          set((state) => {
            const updatedBirthdays = state.birthdays.map((b) =>
              b._id === id ? { ...b, ...updates } : b
            );

            // Re-process to update upcoming/other birthdays
            const today = new Date();
            const upcoming = updatedBirthdays
              .filter((b) => {
                const bday = new Date(b.dob);
                return (
                  bday.getMonth() === today.getMonth() &&
                  bday.getDate() >= today.getDate()
                );
              })
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return aDate.getDate() - bDate.getDate();
              });

            const others = updatedBirthdays
              .filter((b) => !upcoming.some((u) => u._id === b._id))
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return (
                  aDate.getMonth() - bDate.getMonth() ||
                  aDate.getDate() - bDate.getDate()
                );
              });

            return {
              birthdays: updatedBirthdays,
              upcomingBirthdays: upcoming,
              otherBirthdays: others,
            };
          });
        } catch (error) {
          console.error('Error updating birthday:', error);
          throw error;
        }
      },

      deleteBirthday: async (id) => {
        try {
          await axios.delete(
            `${import.meta.env.VITE_BASE_URL}/birthdays/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          set((state) => {
            const filtered = state.birthdays.filter((b) => b._id !== id);

            // Re-process to update upcoming/other birthdays
            const today = new Date();
            const upcoming = filtered
              .filter((b) => {
                const bday = new Date(b.dob);
                return (
                  bday.getMonth() === today.getMonth() &&
                  bday.getDate() >= today.getDate()
                );
              })
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return aDate.getDate() - bDate.getDate();
              });

            const others = filtered
              .filter((b) => !upcoming.some((u) => u._id === b._id))
              .sort((a, b) => {
                const aDate = new Date(a.dob);
                const bDate = new Date(b.dob);
                return (
                  aDate.getMonth() - bDate.getMonth() ||
                  aDate.getDate() - bDate.getDate()
                );
              });

            return {
              birthdays: filtered,
              upcomingBirthdays: upcoming,
              otherBirthdays: others,
            };
          });
        } catch (error) {
          console.error('Error deleting birthday:', error);
          throw error;
        }
      },

      searchBirthdays: (term) => {
        const { birthdays } = get();
        if (!term) return birthdays;
        return birthdays.filter((b) =>
          b.name.toLowerCase().includes(term.toLowerCase())
        );
      },
    }),
    {
      name: 'birthday-storage', // unique name for localStorage
      partialize: (state) => ({
        birthdays: state.birthdays,
        lastFetched: state.lastFetched,
      }), // only persist these fields
    }
  )
);
