import {create} from "zustand"
import { axiosInstance } from "../lib/axios"

export const authStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true
}));