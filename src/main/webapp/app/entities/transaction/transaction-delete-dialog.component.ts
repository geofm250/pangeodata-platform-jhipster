import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';

@Component({
    selector: 'jhi-transaction-delete-dialog',
    templateUrl: './transaction-delete-dialog.component.html'
})
export class TransactionDeleteDialogComponent {
    transaction: ITransaction;

    constructor(
        private transactionService: TransactionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.transactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionListModification',
                content: 'Deleted an transaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-delete-popup',
    template: ''
})
export class TransactionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transaction = transaction;
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
