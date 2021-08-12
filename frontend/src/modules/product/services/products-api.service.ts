import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const apiUrl = 'http://localhost:1337/products/';

class ProductsApiService {
    constructor() {}

    getProducts(): Observable<Product[]> {
        return ajax.get(apiUrl).pipe(map(res => res.response));
    }

    createProduct(todo: Product): Observable<Product> {
        return ajax.post(apiUrl, todo).pipe(
            map((res) => {
                return res.response;
            })
        );
    }

    updateProduct(todo: Product): Observable<Product> {
        return ajax.put(apiUrl + todo.id, todo).pipe(map(res => res.response));
    }

    deleteProduct(id: number): Observable<AjaxResponse> {
        return ajax.delete(apiUrl + id);
    }
}

export default new ProductsApiService();
