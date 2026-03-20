import type {CardCatalogEsimResponse, PaginationResponse} from "@/shared/api/api.ts";
import {api} from "@/shared/api/apiClient.ts";
import {unwrapResponse} from "@/shared/api/utils/unwrapResponse.ts";

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

export type EsimDetailData = {
    catalog: CardCatalogEsimResponse[];
    pagination: PaginationResponse;
};

export const getEsimDetail = async (query?: EsimQueryParams): Promise<EsimDetailData> => {
    const response = await api.api.getCatalogEsimList(query);
    return unwrapResponse(response.data);
};
