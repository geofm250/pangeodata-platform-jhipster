import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDefaultReport } from 'app/shared/model/default-report.model';
import { DefaultReportService } from './default-report.service';

@Component({
    selector: 'jhi-default-report-delete-dialog',
    templateUrl: './default-report-delete-dialog.component.html'
})
export class DefaultReportDeleteDialogComponent {
    defaultReport: IDefaultReport;

    constructor(
        private defaultReportService: DefaultReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.defaultReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'defaultReportListModification',
                content: 'Deleted an defaultReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-default-report-delete-popup',
    template: ''
})
export class DefaultReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ defaultReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DefaultReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.defaultReport = defaultReport;
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
