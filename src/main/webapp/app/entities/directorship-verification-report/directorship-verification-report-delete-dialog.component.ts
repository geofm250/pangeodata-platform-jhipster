import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';
import { DirectorshipVerificationReportService } from './directorship-verification-report.service';

@Component({
    selector: 'jhi-directorship-verification-report-delete-dialog',
    templateUrl: './directorship-verification-report-delete-dialog.component.html'
})
export class DirectorshipVerificationReportDeleteDialogComponent {
    directorshipVerificationReport: IDirectorshipVerificationReport;

    constructor(
        private directorshipVerificationReportService: DirectorshipVerificationReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.directorshipVerificationReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'directorshipVerificationReportListModification',
                content: 'Deleted an directorshipVerificationReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-directorship-verification-report-delete-popup',
    template: ''
})
export class DirectorshipVerificationReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ directorshipVerificationReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DirectorshipVerificationReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.directorshipVerificationReport = directorshipVerificationReport;
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
