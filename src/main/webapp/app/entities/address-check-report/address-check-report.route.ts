import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressCheckReport } from 'app/shared/model/address-check-report.model';
import { AddressCheckReportService } from './address-check-report.service';
import { AddressCheckReportComponent } from './address-check-report.component';
import { AddressCheckReportDetailComponent } from './address-check-report-detail.component';
import { AddressCheckReportUpdateComponent } from './address-check-report-update.component';
import { AddressCheckReportDeletePopupComponent } from './address-check-report-delete-dialog.component';
import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';

@Injectable({ providedIn: 'root' })
export class AddressCheckReportResolve implements Resolve<IAddressCheckReport> {
    constructor(private service: AddressCheckReportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((addressCheckReport: HttpResponse<AddressCheckReport>) => addressCheckReport.body));
        }
        return of(new AddressCheckReport());
    }
}

export const addressCheckReportRoute: Routes = [
    {
        path: 'address-check-report',
        component: AddressCheckReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.addressCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-check-report/:id/view',
        component: AddressCheckReportDetailComponent,
        resolve: {
            addressCheckReport: AddressCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.addressCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-check-report/new',
        component: AddressCheckReportUpdateComponent,
        resolve: {
            addressCheckReport: AddressCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.addressCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-check-report/:id/edit',
        component: AddressCheckReportUpdateComponent,
        resolve: {
            addressCheckReport: AddressCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.addressCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressCheckReportPopupRoute: Routes = [
    {
        path: 'address-check-report/:id/delete',
        component: AddressCheckReportDeletePopupComponent,
        resolve: {
            addressCheckReport: AddressCheckReportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pangeodataJHipsterApp.addressCheckReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
