import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCountry } from 'app/shared/model/product-country.model';
import { ProductCountryService } from './product-country.service';

@Component({
    selector: 'jhi-product-country-delete-dialog',
    templateUrl: './product-country-delete-dialog.component.html'
})
export class ProductCountryDeleteDialogComponent {
    productCountry: IProductCountry;

    constructor(
        private productCountryService: ProductCountryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.productCountryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productCountryListModification',
                content: 'Deleted an productCountry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-country-delete-popup',
    template: ''
})
export class ProductCountryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productCountry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductCountryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productCountry = productCountry;
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
