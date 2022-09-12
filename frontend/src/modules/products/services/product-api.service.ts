import { Product } from '../models/product';
import { Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { apiBasePath } from '../../../environment';
import { toasterSuccess } from '../../../toaster';
import { altKeyPressed$, handleError } from '../../../utils';

const productApiUrl = apiBasePath + '/products/';
const failingProductApiUrl = apiBasePath + '/products-not-ok';
let apiUrl = productApiUrl;

altKeyPressed$.subscribe(updateApiUrl);

function updateApiUrl(altKeyPressed: boolean) {
    apiUrl = altKeyPressed ? failingProductApiUrl : productApiUrl;
}

export class ProductsApiService {
    constructor() {}

    getProducts(): Observable<Product[]> {
        return ajax.get<Product[]>(apiUrl).pipe(
            map((res) => res.response),
            catchError(handleError)
        );
    }

    createProduct(todo: Product): Observable<Product> {
        return ajax.post<Product>(apiUrl, todo).pipe(
            map((res) => {
                return res.response;
            }),
            tap(() => toasterSuccess('Product created')),
            catchError(handleError)
        );
    }

    updateProduct(todo: Product): Observable<Product> {
        return ajax.put<Product>(apiUrl + todo.id, todo).pipe(
            map((res) => res.response),
            tap(() => toasterSuccess('Product updated')),
            catchError(handleError)
        );
    }

    deleteProduct(id: number): Observable<AjaxResponse<unknown>> {
        return ajax.delete(apiUrl + id).pipe(
            tap(() => toasterSuccess('Product deleted')),
            catchError(handleError)
        );
    }
}
