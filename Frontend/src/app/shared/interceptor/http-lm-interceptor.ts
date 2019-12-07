import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class HttpLMInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    // do something with response
                    // if(evt.body && evt.body.success)

                }
            }),
            catchError((err: any) => {
                console.log({err});
                if (err instanceof HttpErrorResponse) {
                    try {
                        if (err.statusText != null) {
                            this.toasterService.error(err.statusText, '');
                        }
                        else {
                            this.toasterService.error(err.name, '');
                        }

                        this.warning(err);
                    } catch (e) {
                        this.toasterService.error('An error occurred', '');
                    }
                    //log error 
                }
                return of(err);
            }));

    }


    private warning(err: HttpErrorResponse) {
        if (err.error.exception) {
            console.warn(err.error.exception);
        }
        if (err.error.message) {
            console.warn(err.error.message);
        }
    }

}