export declare type NumBoolean = 0 | 1;
export declare type StockabeeAuth = {
    token: string;
    user: string;
    pass: string;
};
export declare type SbOrderPostPayload = {
    order_id: string;
    order_ref: string;
    paid: NumBoolean;
    /** Decimal, order total amount without taxes */
    order_amount: number;
    /** Gross total */
    order_total: number;
    customer_id: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    /** Recipient first name */
    ad_firstname: string;
    /** Recipient last name */
    ad_lastname: string;
    /** Recipient phone */
    ad_phone: string;
    ad_address: string;
    ad_postcode: string;
    ad_city: string;
    ad_state: string;
    /** FR, IT, ... */
    ad_country_iso: string;
    details: {
        /** DB product ID */
        product_id: string;
        /** SKU */
        reference: string;
        ean13?: string;
        upc?: string;
        name: string;
        /** Size, etc */
        attributes?: string;
        is_virtual: NumBoolean;
        weight?: number;
        quantity: number;
        /** Order detail/line amount without taxes per unit */
        amount_unit: number;
        /** Order detail/line total amount without taxes */
        amount_total: number;
        /** Order detail/line applicable TAX rate */
        tax: number;
        /** Order detail/line grand total */
        total: number;
    }[];
};
export declare type SbOrderPostPayloadFull = StockabeeAuth & SbOrderPostPayload;
export declare type SbOrderPostResponse = {
    error: boolean;
};
export declare type SbOrderStatus = {
    error?: string;
    /** Your source order ID */
    order_id: string;
    /** Your source order code */
    order_code: string;
    /** Shiptec shipment reference */
    vcon_ref: string;
    /** "2020-11-26" */
    shipment_date: string;
    /** Shipment status, see SHIPPING_STATUS_MESSAGES */
    status_exp: string;
    status_id: false;
    /** "34.98" */
    subtotal: string;
    /** "34.98" */
    total: string;
    fulfillment: [
        {
            sku: string;
            qty: string;
            amount_unit: string;
            tax_rate: 0;
            serials: any[];
        },
        {
            sku: string;
            qty: string;
            amount_unit: string;
            tax_rate: 0;
            serials: any[];
        }
    ];
    agency: string;
    /** Tracking Number */
    tracking: string;
    tracking_url: string;
};
export declare type SbProductPayload = {
    /** The product ID on your system */
    id_product: string;
    /** SKU */
    reference: string;
    name: string;
    weight?: number;
    price?: number;
    /** Tax rate */
    rate?: number;
    img?: string;
    imgs?: string[];
    description?: string;
    atttributes?: string;
};
export declare type SbProductPayloadFull = StockabeeAuth & SbProductPayload;
export declare type SbProductPostResponse = {
    error: boolean;
};
export declare type SbStockStatus = {
    sku: string;
    /** Product barcode */
    barcode: string;
    /** product-interal-code */
    code_internal: string;
    /** product-external-code */
    code_external: string;
    /** your-ID-product on this channel */
    id_product: string;
    /** your-ID-product-attr. on this channel */
    id_product_attribute: string;
    stock: 0;
}[];
export declare const SHIPPING_STATUS_MESSAGES: {
    "100": string;
    "101": string;
    "120": string;
    "002": string;
    "090": string;
    "800": string;
    "003": string;
    "001": string;
    "110": string;
    "007": string;
};
export declare const SHIPPING_STATUS_CODES: {
    /** Recogida pendiente */
    PICKUP_PENDING: string;
    /** Recogida fallida */
    PICKUP_FAILED: string;
    /** Recogida realizada */
    PICKUP_DONE: string;
    /** Entrega pendiente */
    DELIVERY_PENDING: string;
    /** El cliente recogerá en delegación */
    CUSTOMER_WILL_PICK_UP: string;
    /** Entregado en punto de recogido */
    DELIVERED_AT_PICKUP_POINT: string;
    /** Entrega fallida */
    DELIVERY_FAILED: string;
    /** Entregado incidence Incidencia de transporte */
    DELIVERY_ISSUE: string;
    /** Expedición cancelada */
    DELIVERY_CANCELED: string;
    /** Expedición devuelta */
    DELIVERY_REJECTED: string;
};