import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequirement } from 'app/shared/model/requirement.model';

@Component({
    selector: 'jhi-requirement-detail',
    templateUrl: './requirement-detail.component.html'
})
export class RequirementDetailComponent implements OnInit {
    requirement: IRequirement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requirement }) => {
            this.requirement = requirement;
        });
    }

    previousState() {
        window.history.back();
    }
}
