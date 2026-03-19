import {api} from "@/shared/api/apiClient.ts";
import {unwrapResponse} from "@/shared/api/utils/unwrapResponse.ts";
import type {CardCatalogEsimResponse, PaginationResponse} from "@/shared/api/api.ts";

export type EsimQueryParams = {
    country?: string;
    dataFrom?: number;
    dataTo?: number;
    validityFrom?: number;
    validityTo?: number;
    sortByDataQuantity?: "asc" | "desc" | null;
    page?: number;
    quantity?: number;
};

export type EsimCatalogData = {
    catalog: CardCatalogEsimResponse[];
    pagination: PaginationResponse;
};

// Функция запроса
export const getEsimCatalog = async (query?: EsimQueryParams): Promise<EsimCatalogData> => {
    const response = await api.api.getCatalogEsimList(query);
    return unwrapResponse(response.data);
};
