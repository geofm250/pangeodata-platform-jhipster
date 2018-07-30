import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIdentityCheckReport } from 'app/shared/model/identity-check-report.model';
import { IdentityCheckReportService } from './identity-check-report.service';

@Component({
    selector: 'jhi-identity-check-report-delete-dialog',
    templateUrl: './identity-check-report-delete-dialog.component.html'
})
export class IdentityCheckReportDeleteDialogComponent {
    identityCheckReport: IIdentityCheckReport;

    constructor(
        private identityCheckReportService: IdentityCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.identityCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'identityCheckReportListModification',
                content: 'Deleted an identityCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-identity-check-report-delete-popup',
    template: ''
})
export class IdentityCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ identityCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IdentityCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.identityCheckReport = identityCheckReport;
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
