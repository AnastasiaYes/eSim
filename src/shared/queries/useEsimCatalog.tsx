import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {type EsimCatalogData, type EsimQueryParams, getEsimCatalog} from "@/shared/api/hooks/esimApi.ts";

export const useEsimCatalog = (queryParams?: EsimQueryParams) =>
    useQuery<EsimCatalogData, Error, EsimCatalogData, [string, EsimQueryParams?]>({
        queryKey: ["esimCatalog", queryParams],
        queryFn: () => getEsimCatalog(queryParams),
        staleTime: 1000 * 60 * 2,
        placeholderData: keepPreviousData,
    });
