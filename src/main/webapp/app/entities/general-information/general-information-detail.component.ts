import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGeneralInformation } from 'app/shared/model/general-information.model';

@Component({
    selector: 'jhi-general-information-detail',
    templateUrl: './general-information-detail.component.html'
})
export class GeneralInformationDetailComponent implements OnInit {
    generalInformation: IGeneralInformation;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ generalInformation }) => {
            this.generalInformation = generalInformation;
        });
    }

    previousState() {
        window.history.back();
    }
}
