import axios from "axios"
import { SbOrderPostPayload, SbOrderPostResponse, SbOrderStatus, SbProductPayload, SbProductPostResponse, SbStockStatus, StockabeeAuth } from "./types"
export * from "./types"

let auth: StockabeeAuth
const STOCKABEE_URL_PREFIX = "https://blackbox.shiptec.io/channels/priv"

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
    const url = STOCKABEE_URL_PREFIX + "/ping"
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
    if (!auth) throw new Error("Uninitialized")

    const url = STOCKABEE_URL_PREFIX + "/account"
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

    const url = STOCKABEE_URL_PREFIX + "/orders"
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

    const url = STOCKABEE_URL_PREFIX + "/orders/" + id + "/status"
    // return axios.get(url, { headers: { token: auth.token } })
    return axios.post(url, { token: auth.token })
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)

            return response.data
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}

export function postProduct(product: SbProductPayload): Promise<void> {
    if (!auth) throw new Error("Uninitialized")

    const url = STOCKABEE_URL_PREFIX + "/products"
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

    const url = STOCKABEE_URL_PREFIX + "/stocks"
    // return axios.get(url, { headers: { token: auth.token } })
    return axios.post(url, auth)
        .then(response => {
            if (response.status != 200) throw new Error("Status " + response.status)
            else if (typeof response.data != "object") throw new Error("Invalid response: " + typeof response.data)

            return response.data
        })
        .catch(err => {
            console.error(err)
            throw err
        })
}
