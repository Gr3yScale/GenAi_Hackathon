import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


export default async function Api<ReturnData, SendData>(
    method: ApiMethod,
    URL: string,
    data: SendData,
    token: string = ''
): Promise<AxiosResponse<ReturnData>> {
    const configuration: AxiosRequestConfig<SendData> = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method,
        url: URL,
        data,
    };
    try {
        // Make the API call
        return await axios(configuration);
    } catch (error: any) {
        // Handle the error appropriately
        // You can log the error or throw it to be handled by the calling function
        console.error('API call error:', error.message);
        throw error; // Rethrow the error after logging
    }
}
