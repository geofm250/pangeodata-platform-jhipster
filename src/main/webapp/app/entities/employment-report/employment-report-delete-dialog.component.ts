import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmploymentReport } from 'app/shared/model/employment-report.model';
import { EmploymentReportService } from './employment-report.service';

@Component({
    selector: 'jhi-employment-report-delete-dialog',
    templateUrl: './employment-report-delete-dialog.component.html'
})
export class EmploymentReportDeleteDialogComponent {
    employmentReport: IEmploymentReport;

    constructor(
        private employmentReportService: EmploymentReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.employmentReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employmentReportListModification',
                content: 'Deleted an employmentReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employment-report-delete-popup',
    template: ''
})
export class EmploymentReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employmentReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmploymentReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.employmentReport = employmentReport;
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
