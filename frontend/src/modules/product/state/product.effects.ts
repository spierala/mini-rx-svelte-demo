import { from, of } from 'rxjs';
import { catchError, map, mergeMap, startWith } from 'rxjs/operators';

import { Action, undo, actions$ } from 'mini-rx-store';
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
import productsApiService from '../services/products-api.service';
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
            productsApiService.getProducts().pipe(
                map((products) => loadSuccess(products)),
                catchError((err) => of(loadFail(err)))
            )
        )
    );

    updateProduct$ = actions$.pipe(
        ofType(updateProduct),
        toPayload(),
        mergeMap((product) => {
            const optimisticUpdateAction: Action = updateProductOptimistic(product);

            return productsApiService.updateProduct(product).pipe(
                map((updatedProduct) => updateProductSuccess(updatedProduct)),
                catchError((err) => from([updateProductFail(err), undo(optimisticUpdateAction)])),
                startWith(optimisticUpdateAction)
            );
        })
    );

    createProduct$ = actions$.pipe(
        ofType(createProduct),
        toPayload(),
        mergeMap((product: Product) =>
            productsApiService.createProduct(product).pipe(
                map((newProduct) => createProductSuccess(newProduct)),
                catchError((err) => of(createProductFail(err)))
            )
        )
    );

    deleteProduct$ = actions$.pipe(
        ofType(deleteProduct),
        toPayload(),
        mergeMap((productId: number) =>
            productsApiService.deleteProduct(productId).pipe(
                map(() => deleteProductSuccess(productId)),
                catchError((err) => of(deleteProductFail(err)))
            )
        )
    );
}
