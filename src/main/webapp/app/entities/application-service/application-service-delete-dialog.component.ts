import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicationService } from 'app/shared/model/application-service.model';
import { ApplicationServiceService } from './application-service.service';

@Component({
    selector: 'jhi-application-service-delete-dialog',
    templateUrl: './application-service-delete-dialog.component.html'
})
export class ApplicationServiceDeleteDialogComponent {
    applicationService: IApplicationService;

    constructor(
        private applicationServiceService: ApplicationServiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.applicationServiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicationServiceListModification',
                content: 'Deleted an applicationService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-service-delete-popup',
    template: ''
})
export class ApplicationServiceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationService }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ApplicationServiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.applicationService = applicationService;
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
