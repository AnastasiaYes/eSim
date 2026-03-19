import {useQuery} from "@tanstack/react-query"
import {getAvailableCountries} from "@/shared/api/hooks/countriesApi.ts";
import type {CardCountryDictionaryItemResponse} from "@/shared/api/api.ts";

export const useAvailableCountries = () => {
    return useQuery<CardCountryDictionaryItemResponse[]>({
        queryKey: ["countries"],
        queryFn: getAvailableCountries
    });
}
