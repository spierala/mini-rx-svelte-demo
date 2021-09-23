import * as fromProducts from './product.reducer';
import { createFeatureSelector, createSelector } from 'mini-rx-store';
import {
    clearCurrentProduct,
    createProduct,
    deleteProduct,
    initializeCurrentProduct,
    load,
    setCurrentProduct,
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
import { featureKeyUser } from '../../user/state/user-state.service';
import type { UserState } from '../../user/state/user-state.service';

const productFeatureKey = 'products';

// Selector functions
const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>(productFeatureKey);
const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);
const getCurrentProductId = createSelector(
    getProductFeatureState,
    (state) => state.currentProductId
);
const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0,
                price: 0,
            };
        } else {
            return currentProductId ? state.products.find((p) => p.id === currentProductId) : null;
        }
    }
);
const getProducts = createSelector(getProductFeatureState, (state) => state.products);
const getError = createSelector(getProductFeatureState, (state) => state.error);
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
        return cartItems.reduce((accumulated, cartItem) => {
            const foundProduct = products.find((product) => product.id === cartItem.productId);
            if (foundProduct) {
                const newCartItem: CartItem = {
                    ...cartItem,
                    productName: foundProduct.productName,
                    total: foundProduct.price * cartItem.amount,
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
    cartItemsWithExtra.reduce((previousValue: number, currentValue: CartItem) => {
        return previousValue + currentValue.total;
    }, 0)
);
const getUserFeatureState = createFeatureSelector<UserState>(featureKeyUser);
const getPermissions = createSelector(getUserFeatureState, (state) => state.permissions);
const getDetailTitle = createSelector(getPermissions, getCurrentProduct, (permissions, product) => {
    if (permissions.canUpdateProducts) {
        return product && product.id ? 'Edit Product' : 'Create Product';
    }
    return 'View Product';
});

export class ProductFacadeService {
    displayCode$: Observable<boolean> = store.select(getShowProductCode);
    selectedProduct$: Observable<Product> = store.select(getCurrentProduct);
    products$: Observable<Product[]> = store.select(getFilteredProducts);
    errorMessage$: Observable<string> = store.select(getError);
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
        store.dispatch(initializeCurrentProduct());
    }

    selectProduct(product: Product): void {
        store.dispatch(setCurrentProduct(product));
    }

    clearProduct(): void {
        store.dispatch(clearCurrentProduct());
    }

    create(product: Product): void {
        store.dispatch(createProduct(product));
    }

    update(product: Product): void {
        store.dispatch(updateProduct(product));
    }

    delete(product: Product): void {
        store.dispatch(deleteProduct(product.id));
    }

    updateSearch(search: string) {
        store.dispatch(updateSearch(search));
    }

    addProductToCart(product: Product) {
        store.dispatch(addProductToCart(product.id));
    }

    removeProductFromCart(cartItem: CartItem) {
        store.dispatch(removeProductFromCart(cartItem.productId));
    }
}

export const productState = new ProductFacadeService();
