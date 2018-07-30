import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationService } from 'app/shared/model/application-service.model';

@Component({
    selector: 'jhi-application-service-detail',
    templateUrl: './application-service-detail.component.html'
})
export class ApplicationServiceDetailComponent implements OnInit {
    applicationService: IApplicationService;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationService }) => {
            this.applicationService = applicationService;
        });
    }

    previousState() {
        window.history.back();
    }
}
