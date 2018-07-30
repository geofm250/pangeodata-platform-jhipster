import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderInput } from 'app/shared/model/order-input.model';
import { OrderInputService } from './order-input.service';

@Component({
    selector: 'jhi-order-input-delete-dialog',
    templateUrl: './order-input-delete-dialog.component.html'
})
export class OrderInputDeleteDialogComponent {
    orderInput: IOrderInput;

    constructor(private orderInputService: OrderInputService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderInputService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderInputListModification',
                content: 'Deleted an orderInput'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-input-delete-popup',
    template: ''
})
export class OrderInputDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderInput }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderInputDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.orderInput = orderInput;
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
