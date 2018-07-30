import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';
import { SocialMediaCheckReportService } from './social-media-check-report.service';

@Component({
    selector: 'jhi-social-media-check-report-delete-dialog',
    templateUrl: './social-media-check-report-delete-dialog.component.html'
})
export class SocialMediaCheckReportDeleteDialogComponent {
    socialMediaCheckReport: ISocialMediaCheckReport;

    constructor(
        private socialMediaCheckReportService: SocialMediaCheckReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.socialMediaCheckReportService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'socialMediaCheckReportListModification',
                content: 'Deleted an socialMediaCheckReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-social-media-check-report-delete-popup',
    template: ''
})
export class SocialMediaCheckReportDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialMediaCheckReport }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SocialMediaCheckReportDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.socialMediaCheckReport = socialMediaCheckReport;
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
