import axios from "axios"
import { SbOrderPostPayload, SbOrderPostResponse, SbOrderStatus, SbProductPayload, SbProductPostResponse, SbStockStatus, StockabeeAuth } from "./types"
export * from "./types"

let auth: StockabeeAuth
const SHIPTEC_URL_PREFIX = "https://blackbox.shiptec.io/channels/priv"

// MAIN

export function init(credentials: StockabeeAuth) {
    if (auth) return Promise.resolve()

    return checkAvailable()
        .then(() => checkAccount(credentials))
        .then(() => {
            auth = credentials
        })
}

// HELPERS

function checkAvailable() {
    const url = SHIPTEC_URL_PREFIX + "/ping"
    return axios.get(url)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (response.data[0] != "pong") throw new Error("Invalid response")
        })
        .catch(err => {
            console.error(err)
            throw new Error("The StockaBee endpoint is down")
        })
}

function checkAccount(credentials: StockabeeAuth) {
    if (!credentials) throw new Error("Empty credentials")

    const url = SHIPTEC_URL_PREFIX + "/account"
    return axios.post(url, credentials)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (response.data?.active != true) throw new Error("The Stockabee account is not active")
        })
        .catch(err => {
            console.error(err)
            throw new Error("The StockaBee endpoint is down")
        })
}

export function postOrder(order: SbOrderPostPayload): Promise<void> {
    if (!auth) throw new Error("Uninitialized")

    const url = SHIPTEC_URL_PREFIX + "/orders"

    // WARNING: Workaround to ensure that the product ID is unique by appending the SKU
    order.details = order.details.map(item => {
        item.product_id = item.product_id + "-" + item.reference
        return item
    })

    const params = Object.assign({}, auth, order)
    return axios.post(url, params)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)
            const data: SbOrderPostResponse = response.data
            if (data.error) {
                throw new Error("Could not post the order")
            }
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}

export function getOrderStatus(id: string): Promise<SbOrderStatus> {
    if (!auth) throw new Error("Uninitialized")

    const url = SHIPTEC_URL_PREFIX + "/orders/" + id + "/status"
    return axios.post(url, auth)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)
            else if (response.data.error) throw new Error(response.data.error)

            return response.data
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}

export function postProduct(product: SbProductPayload): Promise<void> {
    if (!auth) throw new Error("Uninitialized")

    // WARNING: Workaround to ensure that the product ID is unique by appending the SKU
    product.id_product = product.id_product + "-" + product.reference

    const url = SHIPTEC_URL_PREFIX + "/products"
    const params = Object.assign({}, auth, product)
    return axios.post(url, params)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)
            const data: SbProductPostResponse = response.data
            if (data.error) {
                throw new Error("Could not post the product")
            }
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}

export function getProductStocks(): Promise<SbStockStatus> {
    if (!auth) throw new Error("Uninitialized")

    const url = SHIPTEC_URL_PREFIX + "/stocks"
    // return axios.get(url, { headers: { token: auth.token } })
    return axios.post(url, auth)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)

            return (response.data as SbStockStatus).map(item => {
                const idx = item.id_product.lastIndexOf("-")
                if (idx >= 0) {
                    item.id_product = item.id_product.substr(0, idx)
                }
                return item
            })
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}

