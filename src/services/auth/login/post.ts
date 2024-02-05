import { axiosInstance } from "@/axios/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import { LOGIN_ENDPOINT } from "../endpoints"
import { LoginParams } from "@/context/types"

export const useLogin = () => {
    return useMutation({
        mutationFn:  (values: LoginParams) => {
            return axiosInstance.post(LOGIN_ENDPOINT, values)
        }
    })
}