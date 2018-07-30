import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReferenceCheckReport } from 'app/shared/model/reference-check-report.model';
import { ReferenceCheckReportService } from './reference-check-report.service';

@Component({
    selector: 'jhi-reference-check-report-delete-dialog',
    templateUrl: './reference-check-report-delete-dialog.component.html'
})
export class ReferenceCheckReportDeleteDialogComponent {
    referenceCheckReport: IReferenceCheckReport;

    constructor(
        private referenceCheckReportService: ReferenceCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.referenceCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'referenceCheckReportListModification',
                content: 'Deleted an referenceCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reference-check-report-delete-popup',
    template: ''
})
export class ReferenceCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ referenceCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReferenceCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.referenceCheckReport = referenceCheckReport;
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
