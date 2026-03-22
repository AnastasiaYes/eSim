import type {CardCatalogEsimResponse} from "@/shared/api/api.ts";
import {api} from "@/shared/api/apiClient.ts";
import {unwrapResponse} from "@/shared/api/utils/unwrapResponse.ts";

export type EsimDetailResponse = {
    catalogEsim: CardCatalogEsimResponse;
};

export const getEsimDetail = async (catalogEsimId: number): Promise<EsimDetailResponse> => {
    const response = await api.api.getCatalogEsimDetails(catalogEsimId);
    return unwrapResponse(response.data);
};
