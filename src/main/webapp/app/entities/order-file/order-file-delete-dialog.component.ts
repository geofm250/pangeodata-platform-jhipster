import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderFile } from 'app/shared/model/order-file.model';
import { OrderFileService } from './order-file.service';

@Component({
    selector: 'jhi-order-file-delete-dialog',
    templateUrl: './order-file-delete-dialog.component.html'
})
export class OrderFileDeleteDialogComponent {
    orderFile: IOrderFile;

    constructor(private orderFileService: OrderFileService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.orderFileService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderFileListModification',
                content: 'Deleted an orderFile'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-file-delete-popup',
    template: ''
})
export class OrderFileDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderFile }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderFileDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.orderFile = orderFile;
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
