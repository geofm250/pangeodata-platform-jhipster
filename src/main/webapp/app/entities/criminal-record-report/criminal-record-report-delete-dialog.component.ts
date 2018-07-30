import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICriminalRecordReport } from 'app/shared/model/criminal-record-report.model';
import { CriminalRecordReportService } from './criminal-record-report.service';

@Component({
    selector: 'jhi-criminal-record-report-delete-dialog',
    templateUrl: './criminal-record-report-delete-dialog.component.html'
})
export class CriminalRecordReportDeleteDialogComponent {
    criminalRecordReport: ICriminalRecordReport;

    constructor(
        private criminalRecordReportService: CriminalRecordReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.criminalRecordReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'criminalRecordReportListModification',
                content: 'Deleted an criminalRecordReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-criminal-record-report-delete-popup',
    template: ''
})
export class CriminalRecordReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ criminalRecordReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CriminalRecordReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.criminalRecordReport = criminalRecordReport;
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
