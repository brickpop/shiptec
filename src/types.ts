export type NumBoolean = 0 | 1

export type StockabeeAuth = {
    token: string,
    user: string,
    pass: string
}

export type SbOrderPostPayload = {
    order_id: string,
    order_ref: string,
    paid: NumBoolean,  // Boolean??
    /** Decimal, order total amount without taxes */
    order_amount: number,
    /** Gross total */
    order_total: number,
    customer_id: string,
    customer_firstname: string,
    customer_lastname: string,
    customer_email: string,
    /** Recipient first name */
    ad_firstname: string,
    /** Recipient last name */
    ad_lastname: string,
    /** Recipient phone */
    ad_phone: string,
    ad_address: string,
    ad_postcode: string,
    ad_city: string,
    ad_state: string,
    /** FR, IT, ... */
    ad_country_iso: string,
    details: {
        /** DB product ID */
        product_id: string,
        /** SKU */
        reference: string,
        ean13?: string,
        upc?: string,
        name: string,
        /** Size, etc */
        attributes?: string,
        is_virtual: NumBoolean,
        weight?: number,
        quantity: number,
        /** Order detail/line amount without taxes per unit */
        amount_unit: number,
        /** Order detail/line total amount without taxes */
        amount_total: number,
        /** Order detail/line applicable TAX rate */
        tax: number,
        /** Order detail/line grand total */
        total: number
    }[],

    // Optional

    /** Date time placed `YYYY-MM-DD HH:mm:ss` */
    date_time?: string,
    /** Order currency code Defaults to 978 (euro) */
    currency?: string,
    /** The order status ID on your system */
    status_id?: string,
    /** The order status name on your system */
    status_name?: string,
    /** Order pay method ID on your system */
    payment_id?: string,
    /** Order pay method name on your system */
    payment_name?: string,
    /** Order shipping method ID on your system */
    shipping_id?: string,
    /** Order shipping method name on your system */
    shipping_name?: string,
    /** Customer company name */
    customer_company?: string,
    /** Customer language iso-2 code */
    customer_language_iso?: string,
    /** Delivery address ID on your system */
    ad_alias?: string,
    /** Delivery address alias */
    ad_company?: string,
    /** Recipient company name */
    ad_identity?: string,
    /** Recipient identity number */
    ai_id?: string,
    /** Invoice address ID on your system Invoice address alias */
    ai_alias?: string,
    /** Invoice first name */
    ai_firstname?: string,
    /** Invoice last name */
    ai_lastname?: string,
    /** Invoice company name */
    ai_company?: string,
    /** Invoice identity number */
    ai_identity?: string,
    /** Invoice phone number */
    ai_phone?: string,
    /** Invoice address */
    ai_address?: string,
    /** Invoice post code */
    ai_postcode?: string,
    /** Invoice city */
    ai_city?: string,
    /** Invoice state */
    ai_state?: string,
    /** Invoice iso-2 country code */
    ai_country_iso?: string,
    /** Order delivery notes */
    order_notes?: string,
    /** Warehouse internal fulfillment notes */
    fulfill_notes?: string,
}
export type SbOrderPostPayloadFull = StockabeeAuth & SbOrderPostPayload

export type SbOrderPostResponse = {
    error: boolean
}

export type SbOrderStatus = {
    error?: string // "Order not expedited"
    /** Your source order ID */
    order_id: string,
    /** Your source order code */
    order_code: string,
    /** Shiptec shipment reference */
    vcon_ref: string,
    /** "2020-11-26" */
    shipment_date: string,
    /** Shipment status, see SHIPPING_STATUS_MESSAGES */
    status_exp: string,
    status_id: false,
    /** "34.98" */
    subtotal: string,
    /** "34.98" */
    total: string,
    fulfillment: [
        {
            sku: string,
            qty: string,
            amount_unit: string,
            tax_rate: 0,
            serials: any[]
        },
        {
            sku: string,
            qty: string,
            amount_unit: string,
            tax_rate: 0,
            serials: any[]
        },
    ],
    agency: string,
    /** Tracking Number */
    tracking: string,
    tracking_url: string
}

export type SbProductPayload = {
    /** The product ID on your system */
    id_product: string,
    /** SKU */
    reference: string,
    name: string,
    weight?: number,
    price?: number,
    /** Tax rate */
    rate?: number,
    img?: string,
    imgs?: string[],
    description?: string,
    atttributes?: string,
}
export type SbProductPayloadFull = StockabeeAuth & SbProductPayload

export type SbProductPostResponse = {
    error: boolean
}

export type SbStockStatus = {
    sku: string,
    /** Product barcode */
    barcode: string,
    /** product-interal-code */
    code_internal: string,
    /** product-external-code */
    code_external: string,
    /** your-ID-product on this channel */
    id_product: string,
    /** your-ID-product-attr. on this channel */
    id_product_attribute: string,
    stock: 0
}[]

export const SHIPPING_STATUS_MESSAGES = {
    "100": "Recogida pendiente",
    "101": "Recogida fallida",
    "120": "Recogida realizada",
    "002": "Entrega pendiente",
    "090": "El cliente recogerá en delegación",
    "800": "Entregado en punto de recogido",
    "003": "Entrega fallida",
    "001": "Entregado incidence Incidencia de transporte",
    "110": "Expedición cancelada",
    "007": "Expedición devuelta",
}

export const SHIPPING_STATUS_CODES = {
    /** Recogida pendiente */
    PICKUP_PENDING: "100",
    /** Recogida fallida */
    PICKUP_FAILED: "101",
    /** Recogida realizada */
    PICKUP_DONE: "120",
    /** Entrega pendiente */
    DELIVERY_PENDING: "002",
    /** El cliente recogerá en delegación */
    CUSTOMER_WILL_PICK_UP: "090",
    /** Entregado en punto de recogido */
    DELIVERED_AT_PICKUP_POINT: "800",
    /** Entrega fallida */
    DELIVERY_FAILED: "003",
    /** Entregado incidence Incidencia de transporte */
    DELIVERY_ISSUE: "001",
    /** Expedición cancelada */
    DELIVERY_CANCELED: "110",
    /** Expedición devuelta */
    DELIVERY_REJECTED: "007",
}
