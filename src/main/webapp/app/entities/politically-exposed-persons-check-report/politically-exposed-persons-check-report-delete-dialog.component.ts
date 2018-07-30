import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';
import { PoliticallyExposedPersonsCheckReportService } from './politically-exposed-persons-check-report.service';

@Component({
    selector: 'jhi-politically-exposed-persons-check-report-delete-dialog',
    templateUrl: './politically-exposed-persons-check-report-delete-dialog.component.html'
})
export class PoliticallyExposedPersonsCheckReportDeleteDialogComponent {
    politicallyExposedPersonsCheckReport: IPoliticallyExposedPersonsCheckReport;

    constructor(
        private politicallyExposedPersonsCheckReportService: PoliticallyExposedPersonsCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.politicallyExposedPersonsCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'politicallyExposedPersonsCheckReportListModification',
                content: 'Deleted an politicallyExposedPersonsCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-politically-exposed-persons-check-report-delete-popup',
    template: ''
})
export class PoliticallyExposedPersonsCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ politicallyExposedPersonsCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PoliticallyExposedPersonsCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.politicallyExposedPersonsCheckReport = politicallyExposedPersonsCheckReport;
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
