import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IICoverName } from 'app/shared/model/i-cover-name.model';

@Component({
    selector: 'jhi-i-cover-name-detail',
    templateUrl: './i-cover-name-detail.component.html'
})
export class ICoverNameDetailComponent implements OnInit {
    iCoverName: IICoverName;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ iCoverName }) => {
            this.iCoverName = iCoverName;
        });
    }

    previousState() {
        window.history.back();
    }
}
