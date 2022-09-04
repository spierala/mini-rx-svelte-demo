import { mergeMap, startWith } from 'rxjs/operators';

import { Action, actions$, mapResponse, undo } from 'mini-rx-store';
import { ofType, toPayload } from 'ts-action-operators';
import {
    createProduct,
    createProductFail,
    createProductSuccess,
    deleteProduct,
    deleteProductFail,
    deleteProductSuccess,
    load,
    loadFail,
    loadSuccess,
    updateProduct,
    updateProductFail,
    updateProductOptimistic,
    updateProductSuccess,
} from './product.actions';
import { Product } from '../models/product';
import productApiService from '../services/product-api.service';
import { store } from '../../../stores';

export class ProductEffects {
    constructor() {
        store.effect(this.loadProducts$);
        store.effect(this.updateProduct$);
        store.effect(this.createProduct$);
        store.effect(this.deleteProduct$);
    }

    loadProducts$ = actions$.pipe(
        ofType(load),
        mergeMap((action) =>
            productApiService.getProducts().pipe(
                mapResponse(
                    (products) => loadSuccess(products),
                    (error) => loadFail(error)
                )
            )
        )
    );

    // Effect with optimistic update and undo
    updateProduct$ = actions$.pipe(
        ofType(updateProduct),
        toPayload(),
        mergeMap((product) => {
            const optimisticUpdateAction: Action = updateProductOptimistic(product);

            return productApiService.updateProduct(product).pipe(
                mapResponse(
                    (updatedProduct) => updateProductSuccess(updatedProduct),
                    (err) => [updateProductFail(err), undo(optimisticUpdateAction)]
                ),
                startWith(optimisticUpdateAction)
            );
        })
    );

    createProduct$ = actions$.pipe(
        ofType(createProduct),
        toPayload(),
        mergeMap((product: Product) =>
            productApiService.createProduct(product).pipe(
                mapResponse(
                    (newProduct) => createProductSuccess(newProduct),
                    (err) => createProductFail(err)
                )
            )
        )
    );

    deleteProduct$ = actions$.pipe(
        ofType(deleteProduct),
        toPayload(),
        mergeMap((productId: number) =>
            productApiService.deleteProduct(productId).pipe(
                mapResponse(
                    () => deleteProductSuccess(productId),
                    (err) => deleteProductFail(err)
                )
            )
        )
    );
}
