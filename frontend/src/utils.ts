import { toastrError } from './toaster';
import { throwError } from 'rxjs';

export function handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // API error
        errorMessage = `${err.name}: ${err.message}`;
    }
    console.error(err);
    toastrError(errorMessage);
    return throwError(errorMessage);
}
