import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIOrderReport } from 'app/shared/model/i-order-report.model';
import { IOrderReportService } from './i-order-report.service';

@Component({
    selector: 'jhi-i-order-report-delete-dialog',
    templateUrl: './i-order-report-delete-dialog.component.html'
})
export class IOrderReportDeleteDialogComponent {
    iOrderReport: IIOrderReport;

    constructor(
        private iOrderReportService: IOrderReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.iOrderReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iOrderReportListModification',
                content: 'Deleted an iOrderReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-i-order-report-delete-popup',
    template: ''
})
export class IOrderReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iOrderReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IOrderReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.iOrderReport = iOrderReport;
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
