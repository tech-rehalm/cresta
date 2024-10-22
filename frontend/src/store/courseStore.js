// store/courseStore.js
import {create} from 'zustand';
import axios from 'axios';

const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://cresta-api.vercel.app/api/courses/get'); // Update this to match your API
      set({ courses: response.data, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  createCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('https://cresta-api.vercel.app/api/courses/create', courseData); // Update this to match your API
      set((state) => ({ courses: [...state.courses, response.data.course], loading: false }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  editCourse: async (id, courseData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`https://cresta-api.vercel.app/api/courses/edit/${id}`, courseData); // Update this to match your API
      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === id ? response.data.course : course
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`https://cresta-api.vercel.app/api/courses/delete/${id}`); // Update this to match your API
      set((state) => ({
        courses: state.courses.filter((course) => course._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useCourseStore;
