import * as fromProducts from './product.reducer';
import { createFeatureSelector, createSelector } from 'mini-rx-store';
import {
    clearCurrentProduct,
    createProduct,
    deleteProduct,
    initializeNewProduct,
    load,
    selectProduct,
    toggleProductCode,
    updateProduct,
    updateSearch,
    addProductToCart,
    removeProductFromCart,
} from './product.actions';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { store } from '../../../stores';
import { ProductEffects } from './product.effects';
import { productReducer } from './product.reducer';
import { featureKeyUser } from '../../user/state/user-store';
import type { UserState } from '../../user/state/user-store';

const productFeatureKey = 'products';

// MEMOIZED SELECTORS
const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>('products');
const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);
const getSelectedProduct = createSelector(getProductFeatureState, (state) => state.selectedProduct);
const getProducts = createSelector(getProductFeatureState, (state) => state.products);
const getSearch = createSelector(getProductFeatureState, (state) => state.search);
const getFilteredProducts = createSelector(getProducts, getSearch, (products, search) => {
    return products.filter(
        (item) => item.productName.toUpperCase().indexOf(search.toUpperCase()) > -1
    );
});
const getCartItems = createSelector(getProductFeatureState, (state) => state.cart);
const getCartItemsWithExtraData = createSelector(
    getProducts,
    getCartItems,
    (products, cartItems) => {
        return cartItems.reduce<CartItem[]>((accumulated, cartItem) => {
            const foundProduct: Product | undefined = products.find(
                (product) => product.id === cartItem.productId
            );
            if (foundProduct) {
                const newCartItem: CartItem = {
                    ...cartItem,
                    productName: foundProduct.productName,
                    total:
                        typeof foundProduct.price !== 'undefined'
                            ? foundProduct.price * cartItem.amount
                            : 0,
                };
                return [...accumulated, newCartItem];
            }
            return accumulated;
        }, []);
    }
);
const getCartItemsAmount = createSelector(getCartItemsWithExtraData, (cartItems) => {
    return cartItems.length;
});
const getHasCartItems = createSelector(getCartItemsAmount, (amount) => {
    return amount > 0;
});
const getCartTotalPrice = createSelector(getCartItemsWithExtraData, (cartItemsWithExtra) =>
    cartItemsWithExtra.reduce<number>((previousValue: number, currentValue: CartItem) => {
        if (typeof currentValue.total !== 'undefined') {
            return previousValue + currentValue.total;
        }
        return previousValue;
    }, 0)
);

const getUserFeatureState = createFeatureSelector<UserState>(featureKeyUser);
const getPermissions = createSelector(getUserFeatureState, (state) => state.permissions);
const getDetailTitle = createSelector(getPermissions, getSelectedProduct, (permissions, product) => {
    if (permissions.canUpdateProducts) {
        return product && product.id ? 'Edit Product' : 'Create Product';
    }
    return 'View Product';
});

export class ProductStoreFacade {
    // STATE OBSERVABLES
    displayCode$: Observable<boolean> = store.select(getShowProductCode);
    selectedProduct$: Observable<Product | undefined> = store.select(getSelectedProduct);
    products$: Observable<Product[]> = store.select(getFilteredProducts);
    search$: Observable<string> = store.select(getSearch);
    cartItems$: Observable<CartItem[]> = store.select(getCartItemsWithExtraData);
    cartItemsAmount$: Observable<number> = store.select(getCartItemsAmount);
    cartTotalPrice$: Observable<number> = store.select(getCartTotalPrice);
    hasCartItems$: Observable<boolean> = store.select(getHasCartItems);
    detailTitle$: Observable<string> = store.select(getDetailTitle);

    constructor() {
        const effects = new ProductEffects();
        store.feature(productFeatureKey, productReducer);

        this.load();
    }

    private load() {
        store.dispatch(load());
    }

    toggleProductCode(value: boolean) {
        store.dispatch(toggleProductCode(value));
    }

    newProduct(): void {
        store.dispatch(initializeNewProduct());
    }

    selectProduct(product: Product): void {
        store.dispatch(selectProduct(product));
    }

    clearCurrentProduct(): void {
        store.dispatch(clearCurrentProduct());
    }

    create(product: Product): void {
        store.dispatch(createProduct(product));
    }

    update(product: Product): void {
        store.dispatch(updateProduct(product));
    }

    delete(product: Product): void {
        store.dispatch(deleteProduct(product.id!));
    }

    updateSearch(search: string) {
        store.dispatch(updateSearch(search));
    }

    addProductToCart(product: Product) {
        store.dispatch(addProductToCart(product.id!));
    }

    removeProductFromCart(cartItem: CartItem) {
        store.dispatch(removeProductFromCart(cartItem.productId!));
    }
}

export const productStoreFacade = new ProductStoreFacade();
