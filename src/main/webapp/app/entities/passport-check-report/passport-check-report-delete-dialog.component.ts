import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPassportCheckReport } from 'app/shared/model/passport-check-report.model';
import { PassportCheckReportService } from './passport-check-report.service';

@Component({
    selector: 'jhi-passport-check-report-delete-dialog',
    templateUrl: './passport-check-report-delete-dialog.component.html'
})
export class PassportCheckReportDeleteDialogComponent {
    passportCheckReport: IPassportCheckReport;

    constructor(
        private passportCheckReportService: PassportCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.passportCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'passportCheckReportListModification',
                content: 'Deleted an passportCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-passport-check-report-delete-popup',
    template: ''
})
export class PassportCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ passportCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PassportCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.passportCheckReport = passportCheckReport;
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
