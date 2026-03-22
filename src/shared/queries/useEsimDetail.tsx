import {useQuery} from "@tanstack/react-query";
import {getEsimDetail} from "@/shared/api/hooks/esimDetailApi.ts";

export const useEsimDetail = (catalogEsimId?: number) => {
    return useQuery({
        queryKey: ["esimDetail", catalogEsimId],
        queryFn: () => getEsimDetail(catalogEsimId!),
        enabled: !!catalogEsimId,
        staleTime: 1000 * 60 * 2,
    });
};
