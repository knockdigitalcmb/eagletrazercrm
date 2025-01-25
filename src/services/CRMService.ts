import { commonServiceAPI } from "./API";

export class CRMServiceAPI {
    static getUserList = async (payload: any) => {
        try {
            const response = await commonServiceAPI.CRMAPICall({
                url: 'https://dummyapi.online/api/movies',
                method: 'POST',
                data: payload
            })
            return response?.data
        } catch (error) {
            console.log("get user list api error", error)
        }
    }
}