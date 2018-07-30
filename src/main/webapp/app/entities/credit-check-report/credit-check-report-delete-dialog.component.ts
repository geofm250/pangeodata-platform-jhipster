import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICreditCheckReport } from 'app/shared/model/credit-check-report.model';
import { CreditCheckReportService } from './credit-check-report.service';

@Component({
    selector: 'jhi-credit-check-report-delete-dialog',
    templateUrl: './credit-check-report-delete-dialog.component.html'
})
export class CreditCheckReportDeleteDialogComponent {
    creditCheckReport: ICreditCheckReport;

    constructor(
        private creditCheckReportService: CreditCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.creditCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'creditCheckReportListModification',
                content: 'Deleted an creditCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-credit-check-report-delete-popup',
    template: ''
})
export class CreditCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ creditCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CreditCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.creditCheckReport = creditCheckReport;
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
