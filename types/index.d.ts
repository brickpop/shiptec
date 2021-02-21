import { SbOrderPostPayload, SbOrderStatus, SbProductPayload, SbStockStatus, StockabeeAuth } from "./types";
export * from "./types";
export declare function init(credentials: StockabeeAuth): Promise<void>;
export declare function postOrder(order: SbOrderPostPayload): Promise<void>;
export declare function getOrderStatus(id: string): Promise<SbOrderStatus>;
export declare function postProduct(product: SbProductPayload): Promise<void>;
export declare function getProductStocks(): Promise<SbStockStatus>;
