import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOffence } from 'app/shared/model/offence.model';
import { OffenceService } from './offence.service';

@Component({
    selector: 'jhi-offence-delete-dialog',
    templateUrl: './offence-delete-dialog.component.html'
})
export class OffenceDeleteDialogComponent {
    offence: IOffence;

    constructor(private offenceService: OffenceService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.offenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'offenceListModification',
                content: 'Deleted an offence'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-offence-delete-popup',
    template: ''
})
export class OffenceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offence }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OffenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.offence = offence;
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
