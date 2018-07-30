import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeneralInformation } from 'app/shared/model/general-information.model';
import { GeneralInformationService } from './general-information.service';

@Component({
    selector: 'jhi-general-information-delete-dialog',
    templateUrl: './general-information-delete-dialog.component.html'
})
export class GeneralInformationDeleteDialogComponent {
    generalInformation: IGeneralInformation;

    constructor(
        private generalInformationService: GeneralInformationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.generalInformationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'generalInformationListModification',
                content: 'Deleted an generalInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-general-information-delete-popup',
    template: ''
})
export class GeneralInformationDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalInformation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GeneralInformationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.generalInformation = generalInformation;
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
