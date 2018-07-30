import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IToken } from 'app/shared/model/token.model';

@Component({
    selector: 'jhi-token-detail',
    templateUrl: './token-detail.component.html'
})
export class TokenDetailComponent implements OnInit {
    token: IToken;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ token }) => {
            this.token = token;
        });
    }

    previousState() {
        window.history.back();
    }
}
