import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';
import { CivilLitigationCheckReportService } from './civil-litigation-check-report.service';

@Component({
    selector: 'jhi-civil-litigation-check-report-delete-dialog',
    templateUrl: './civil-litigation-check-report-delete-dialog.component.html'
})
export class CivilLitigationCheckReportDeleteDialogComponent {
    civilLitigationCheckReport: ICivilLitigationCheckReport;

    constructor(
        private civilLitigationCheckReportService: CivilLitigationCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.civilLitigationCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'civilLitigationCheckReportListModification',
                content: 'Deleted an civilLitigationCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-civil-litigation-check-report-delete-popup',
    template: ''
})
export class CivilLitigationCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ civilLitigationCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CivilLitigationCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.civilLitigationCheckReport = civilLitigationCheckReport;
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
