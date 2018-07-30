import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILicenseCheckReport } from 'app/shared/model/license-check-report.model';
import { LicenseCheckReportService } from './license-check-report.service';

@Component({
    selector: 'jhi-license-check-report-delete-dialog',
    templateUrl: './license-check-report-delete-dialog.component.html'
})
export class LicenseCheckReportDeleteDialogComponent {
    licenseCheckReport: ILicenseCheckReport;

    constructor(
        private licenseCheckReportService: LicenseCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.licenseCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'licenseCheckReportListModification',
                content: 'Deleted an licenseCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-license-check-report-delete-popup',
    template: ''
})
export class LicenseCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ licenseCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LicenseCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.licenseCheckReport = licenseCheckReport;
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
