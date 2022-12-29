export enum PaginationParams {
  PER_PAGE = "per",
  CURRENT_PAGE = "page"
}

export type PaginationParamsObject = Record<string, string | null>;

export type PaginationParamsArray = [string, string][];
