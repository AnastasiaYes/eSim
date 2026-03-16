/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BalanceTransactionListRequest {
  /** @default 1 */
  page: number;
  /** @default 20 */
  quantity: number;
}

export interface BalanceTransactionResponse {
  id: number;
  userId: number;
  type: string;
  status: string;
  /** @format float */
  amount: number;
  currency: string;
  /** @format float */
  settlementAmount: number;
  settlementCurrency: string;
  description: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  completedAt: string | null;
}

export interface CardCountryDictionaryItemResponse {
  code: string;
}

export interface CardCatalogEsimListRequest {
  /**
   * @minLength 2
   * @maxLength 2
   */
  country?: string | null;
  /** @format number */
  dataFrom?: number | null;
  /** @format number */
  dataTo?: number | null;
  validityFrom?: number | null;
  validityTo?: number | null;
  sortByDataQuantity?: "asc" | "desc" | null;
  /** @default 1 */
  page: number;
  /** @default 20 */
  quantity: number;
}

export interface CardCatalogEsimResponse {
  id: number;
  name: string;
  description: string | null;
  /** @format float */
  price: number;
  currency: string;
  dataQuantity: number;
  dataUnit: string;
  packageValidity: number;
  packageValidityUnit: string;
  packageType: string | null;
  unlimited: boolean;
  isActive: boolean;
  countryCode: string;
}

export interface CardEsimCreateRequest {
  catalogEsimId: number;
}

export interface CardEsimListRequest {
  /** @default 1 */
  page: number;
  /** @default 20 */
  quantity: number;
}

export interface CardEsimResponse {
  id: number;
  userId: number;
  catalogEsimId: number;
  transactionId: number;
  qrDataInstallation: string | null;
  status: string;
  iccid: string | null;
  /** @format float */
  remainingDataQuantity: number | null;
  remainingDataUnit: string | null;
  packageName: string | null;
  packageDescription: string | null;
  /** @format float */
  price: number | null;
  currency: string | null;
  /** @format date-time */
  createdAt: string;
}

export interface PaginationResponse {
  quantity: number;
  totalQuantity: number;
  currentPage: number;
  pages: number;
}

export interface UserConfigureResponse {
  success: boolean;
  data: object;
}

export interface UserConfigureRequest {
  /**
   * @minLength 2
   * @maxLength 2
   */
  country: string;
  /**
   * @minLength 3
   * @maxLength 3
   */
  currency: "RUB" | "USD" | "EUR";
}

export interface UserDetailsResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      login: string;
      /** @format money */
      balance: number;
      currency: string | null;
      isConfigured: boolean;
    };
  };
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Roamly eSim api
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Get current user transaction details
     *
     * @tags Balance
     * @name GetBalanceTransaction
     * @request GET:/api/balances/transactions/{transactionId}
     * @secure
     */
    getBalanceTransaction: (
      transactionId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          success: boolean;
          data: {
            transaction: BalanceTransactionResponse;
          };
        },
        any
      >({
        path: `/api/balances/transactions/${transactionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user balance transactions list
     *
     * @tags Balance
     * @name GetBalanceTransactions
     * @request GET:/api/balances/transactions
     * @secure
     */
    getBalanceTransactions: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          success: boolean;
          data: {
            transactions: BalanceTransactionResponse[];
            pagination: PaginationResponse;
          };
        },
        any
      >({
        path: `/api/balances/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get country dictionary filtered by active eSIM catalog availability
     *
     * @tags Card
     * @name GetAvailableCatalogCountries
     * @request GET:/api/cards/catalog/countries
     * @secure
     */
    getAvailableCatalogCountries: (params: RequestParams = {}) =>
      this.request<
        {
          success: boolean;
          data: {
            countries: CardCountryDictionaryItemResponse[];
          };
        },
        any
      >({
        path: `/api/cards/catalog/countries`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get eSIM catalog with filters
     *
     * @tags Card
     * @name GetCatalogEsimList
     * @request GET:/api/cards/catalog/esims
     * @secure
     */
    getCatalogEsimList: (
      query?: {
        /**
         * @minLength 2
         * @maxLength 2
         */
        country?: string | null;
        /**
         * Minimum data quantity in GB
         * @format number
         */
        dataFrom?: number | null;
        /**
         * Maximum data quantity in GB
         * @format number
         */
        dataTo?: number | null;
        /** Minimum package validity in days */
        validityFrom?: number | null;
        /** Maximum package validity in days */
        validityTo?: number | null;
        /** Sort by data quantity normalized to GB */
        sortByDataQuantity?: "asc" | "desc" | null;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          success: boolean;
          data: {
            catalog: CardCatalogEsimResponse[];
            pagination: PaginationResponse;
          };
        },
        any
      >({
        path: `/api/cards/catalog/esims`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user eSIM cards
     *
     * @tags Card
     * @name GetListEsimCards
     * @request GET:/api/cards/esims
     * @secure
     */
    getListEsimCards: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        quantity?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          success: boolean;
          data: {
            esims: CardEsimResponse[];
            pagination: PaginationResponse;
          };
        },
        any
      >({
        path: `/api/cards/esims`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create eSIM card from catalog package
     *
     * @tags Card
     * @name CreateEsimCard
     * @request POST:/api/cards/esims
     * @secure
     */
    createEsimCard: (data: CardEsimCreateRequest, params: RequestParams = {}) =>
      this.request<
        {
          success: boolean;
          data: {
            esim: CardEsimResponse;
          };
        },
        any
      >({
        path: `/api/cards/esims`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user eSIM card details
     *
     * @tags Card
     * @name GetEsimCardDetails
     * @request GET:/api/cards/esims/{esimCardId}
     * @secure
     */
    getEsimCardDetails: (esimCardId: number, params: RequestParams = {}) =>
      this.request<
        {
          success: boolean;
          data: {
            esim: CardEsimResponse;
          };
        },
        any
      >({
        path: `/api/cards/esims/${esimCardId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Refresh eSIM card data from provider
     *
     * @tags Card
     * @name RefreshEsimCard
     * @request POST:/api/cards/esims/{esimCardId}/refresh
     * @secure
     */
    refreshEsimCard: (esimCardId: number, params: RequestParams = {}) =>
      this.request<
        {
          success: boolean;
          data: {
            esim: CardEsimResponse;
          };
        },
        any
      >({
        path: `/api/cards/esims/${esimCardId}/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Configure user tokens
     *
     * @tags User
     * @name ConfigureUser
     * @request POST:/api/users/me/configure
     * @secure
     */
    configureUser: (data: UserConfigureRequest, params: RequestParams = {}) =>
      this.request<UserConfigureResponse, any>({
        path: `/api/users/me/configure`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get user details
     *
     * @tags User
     * @name GetCurrentUser
     * @request GET:/api/users/me
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<UserDetailsResponse, any>({
        path: `/api/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
