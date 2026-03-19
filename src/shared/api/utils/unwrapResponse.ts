import type {ApiResponse} from "@/shared/api/type/ApiResponse.ts";

export function unwrapResponse<T>(res: ApiResponse<T>): T {
    if (!res.success) {
        throw new Error(res.error || "API error")
    }

    return res.data
}
