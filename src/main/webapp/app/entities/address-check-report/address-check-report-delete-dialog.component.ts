import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddressCheckReport } from 'app/shared/model/address-check-report.model';
import { AddressCheckReportService } from './address-check-report.service';

@Component({
    selector: 'jhi-address-check-report-delete-dialog',
    templateUrl: './address-check-report-delete-dialog.component.html'
})
export class AddressCheckReportDeleteDialogComponent {
    addressCheckReport: IAddressCheckReport;

    constructor(
        private addressCheckReportService: AddressCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.addressCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'addressCheckReportListModification',
                content: 'Deleted an addressCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-check-report-delete-popup',
    template: ''
})
export class AddressCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ addressCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AddressCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.addressCheckReport = addressCheckReport;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
