import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOffence } from 'app/shared/model/offence.model';

@Component({
    selector: 'jhi-offence-detail',
    templateUrl: './offence-detail.component.html'
})
export class OffenceDetailComponent implements OnInit {
    offence: IOffence;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offence }) => {
            this.offence = offence;
        });
    }

    previousState() {
        window.history.back();
    }
}
