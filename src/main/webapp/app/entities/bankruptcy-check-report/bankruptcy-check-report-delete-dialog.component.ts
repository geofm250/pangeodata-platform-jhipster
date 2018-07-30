import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';
import { BankruptcyCheckReportService } from './bankruptcy-check-report.service';

@Component({
    selector: 'jhi-bankruptcy-check-report-delete-dialog',
    templateUrl: './bankruptcy-check-report-delete-dialog.component.html'
})
export class BankruptcyCheckReportDeleteDialogComponent {
    bankruptcyCheckReport: IBankruptcyCheckReport;

    constructor(
        private bankruptcyCheckReportService: BankruptcyCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.bankruptcyCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bankruptcyCheckReportListModification',
                content: 'Deleted an bankruptcyCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bankruptcy-check-report-delete-popup',
    template: ''
})
export class BankruptcyCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bankruptcyCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BankruptcyCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bankruptcyCheckReport = bankruptcyCheckReport;
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
