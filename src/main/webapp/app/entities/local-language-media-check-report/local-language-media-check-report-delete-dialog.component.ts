import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';
import { LocalLanguageMediaCheckReportService } from './local-language-media-check-report.service';

@Component({
    selector: 'jhi-local-language-media-check-report-delete-dialog',
    templateUrl: './local-language-media-check-report-delete-dialog.component.html'
})
export class LocalLanguageMediaCheckReportDeleteDialogComponent {
    localLanguageMediaCheckReport: ILocalLanguageMediaCheckReport;

    constructor(
        private localLanguageMediaCheckReportService: LocalLanguageMediaCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.localLanguageMediaCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'localLanguageMediaCheckReportListModification',
                content: 'Deleted an localLanguageMediaCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-local-language-media-check-report-delete-popup',
    template: ''
})
export class LocalLanguageMediaCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ localLanguageMediaCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LocalLanguageMediaCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.localLanguageMediaCheckReport = localLanguageMediaCheckReport;
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
