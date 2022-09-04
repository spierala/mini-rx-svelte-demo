import { toastrError } from './toaster';
import { fromEvent, merge, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const keyDowns$ = fromEvent<KeyboardEvent>(document, 'keydown');
const keyUps$ = fromEvent<KeyboardEvent>(document, 'keyup');
export const altKeyPressed$: Observable<boolean> = merge(keyDowns$, keyUps$).pipe(
    map((e) => e.altKey)
);

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
