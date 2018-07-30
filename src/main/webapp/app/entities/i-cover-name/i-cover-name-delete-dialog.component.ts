import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IICoverName } from 'app/shared/model/i-cover-name.model';
import { ICoverNameService } from './i-cover-name.service';

@Component({
    selector: 'jhi-i-cover-name-delete-dialog',
    templateUrl: './i-cover-name-delete-dialog.component.html'
})
export class ICoverNameDeleteDialogComponent {
    iCoverName: IICoverName;

    constructor(private iCoverNameService: ICoverNameService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.iCoverNameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iCoverNameListModification',
                content: 'Deleted an iCoverName'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-i-cover-name-delete-popup',
    template: ''
})
export class ICoverNameDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iCoverName }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ICoverNameDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.iCoverName = iCoverName;
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
