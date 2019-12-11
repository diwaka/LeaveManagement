import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { ComponentBase } from '../components/component-base';
@Injectable()
export class HttpLMInterceptor extends ComponentBase implements HttpInterceptor {
    constructor(public toasterService: ToastrService) {
        super();
    }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.body && (event.body.response == 200 || event.body.response == 201)) {
                            this.toasterService.success(event.body.message, '');
                        }
                    }
                },
                (err: HttpErrorResponse) => {
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
                    }
                }
            ),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}" in ${elapsed} ms.`;
                console.log(msg);
            })
        );
    }


    private warning(err: HttpErrorResponse) {
        if (err.error.exception) {
            console.warn(err.error.exception);
        }
        if (err.error.message) {
            console.warn(err.error.message);
        }
    }



    // return next.handle(req).pipe(
    //     tap(evt => {
    //         if (evt instanceof HttpResponse) {
    //             // do something with response
    //             // if(evt.body && evt.body.success)

    //         }
    //     }),
    //     catchError((err: any) => {
    //         console.log(err);
    //         if (err instanceof HttpErrorResponse) {
    //             try {
    //                 if (err.statusText != null) {
    //                     this.toasterService.error(err.statusText, '');
    //                 }
    //                 else {
    //                     this.toasterService.error(err.name, '');
    //                 }
    //                 this.warning(err);
    //             } catch (e) {
    //                 this.toasterService.error('An error occurred', '');
    //             }
    //             //log error 
    //         }
    //         return of(err);
    //     })

    // );
}