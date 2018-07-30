import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IToken } from 'app/shared/model/token.model';
import { TokenService } from './token.service';

@Component({
    selector: 'jhi-token-delete-dialog',
    templateUrl: './token-delete-dialog.component.html'
})
export class TokenDeleteDialogComponent {
    token: IToken;

    constructor(private tokenService: TokenService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.tokenService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tokenListModification',
                content: 'Deleted an token'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-token-delete-popup',
    template: ''
})
export class TokenDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ token }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TokenDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.token = token;
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
