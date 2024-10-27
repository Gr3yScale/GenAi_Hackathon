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
        data: data
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

interface FetchResponse<Data> {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
}

export async function fetchApi<ReturnData, SendData>(
    method: ApiMethod,
    URL: string,
    data: SendData,
    token: string = ''
): Promise<FetchResponse<ReturnData>> {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

    const config: RequestInit = {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(URL, config);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}