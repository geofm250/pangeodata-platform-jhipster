import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderEducationForm } from 'app/shared/model/order-education-form.model';
import { OrderEducationFormService } from './order-education-form.service';

@Component({
    selector: 'jhi-order-education-form-delete-dialog',
    templateUrl: './order-education-form-delete-dialog.component.html'
})
export class OrderEducationFormDeleteDialogComponent {
    orderEducationForm: IOrderEducationForm;

    constructor(
        private orderEducationFormService: OrderEducationFormService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderEducationFormService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderEducationFormListModification',
                content: 'Deleted an orderEducationForm'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-education-form-delete-popup',
    template: ''
})
export class OrderEducationFormDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderEducationForm }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderEducationFormDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderEducationForm = orderEducationForm;
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
