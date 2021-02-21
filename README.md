# Stockabee

This repo is available to be included as a submodule. Future versions will be on NPM.

### Install
```sh
git submodule add https://github.com/brickpop/stockabee.git lib/stockabee
```

### Usage

```typescript
import { init, postOrder, getOrderStatus, postProduct, getProductStocks } from "lib/stockabee"

await init({
    token: "1234",
    user: "user",
    pass: "pwd"
})
await postOrder(order)
await getOrderStatus(id).then(console.log)
await postProduct(product)
await getProductStocks().then(console.log)
```

### Types
```typescript
import {StockabeeAuth, SbOrderPostPayload, SbOrderPostResponse, SbOrderStatus, SbProductPayload, SbProductPostResponse, SbStockStatus} from "lib/stockabee"
```
