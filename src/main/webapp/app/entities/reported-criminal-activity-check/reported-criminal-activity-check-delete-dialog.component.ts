import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';
import { ReportedCriminalActivityCheckService } from './reported-criminal-activity-check.service';

@Component({
    selector: 'jhi-reported-criminal-activity-check-delete-dialog',
    templateUrl: './reported-criminal-activity-check-delete-dialog.component.html'
})
export class ReportedCriminalActivityCheckDeleteDialogComponent {
    reportedCriminalActivityCheck: IReportedCriminalActivityCheck;

    constructor(
        private reportedCriminalActivityCheckService: ReportedCriminalActivityCheckService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.reportedCriminalActivityCheckService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reportedCriminalActivityCheckListModification',
                content: 'Deleted an reportedCriminalActivityCheck'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reported-criminal-activity-check-delete-popup',
    template: ''
})
export class ReportedCriminalActivityCheckDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reportedCriminalActivityCheck }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReportedCriminalActivityCheckDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.reportedCriminalActivityCheck = reportedCriminalActivityCheck;
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
