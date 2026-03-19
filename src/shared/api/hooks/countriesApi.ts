import {api} from "@/shared/api/apiClient.ts"
import { unwrapResponse } from "@/shared/api/utils/unwrapResponse"
import type {CardCountryDictionaryItemResponse} from "@/shared/api/api.ts";

export interface AvailableCountriesResponse {
    success: boolean;
    data: {
        countries: CardCountryDictionaryItemResponse[];
    };
}

// Функция запроса с правильным возвращаемым типом
export const getAvailableCountries = async (): Promise<CardCountryDictionaryItemResponse[]> => {
    const response = await api.api.getAvailableCatalogCountries();
    const unwrappedData = unwrapResponse(response.data);
    return unwrappedData.countries;
}
