import { create } from 'zustand'
import axios from 'axios'

const apiUrl = "http://localhost:5000/api/enrollments"
export const useEnrollmentStore = create((set) => ({
    enrollments: [],
    isLoading: false,
    error: null,
    
    fetchEnrollments: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${apiUrl}`);
            set({ enrollments: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createEnrollment: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${apiUrl}`, data);
            set((state) => ({ enrollments: [...state.enrollments, response.data], isLoading: false }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateEnrollment: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.patch(`${apiUrl}/${id}`, data);
            set((state) => ({
                enrollments: state.enrollments.map(enrollment =>
                    enrollment._id === id ? response.data : enrollment
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteEnrollment: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${apiUrl}/${id}`);
            set((state) => ({
                enrollments: state.enrollments.filter(enrollment => enrollment._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
