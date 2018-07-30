import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIOrderForm } from 'app/shared/model/i-order-form.model';
import { IOrderFormService } from './i-order-form.service';

@Component({
    selector: 'jhi-i-order-form-delete-dialog',
    templateUrl: './i-order-form-delete-dialog.component.html'
})
export class IOrderFormDeleteDialogComponent {
    iOrderForm: IIOrderForm;

    constructor(private iOrderFormService: IOrderFormService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.iOrderFormService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'iOrderFormListModification',
                content: 'Deleted an iOrderForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-i-order-form-delete-popup',
    template: ''
})
export class IOrderFormDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iOrderForm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IOrderFormDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.iOrderForm = iOrderForm;
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
