import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRule } from 'app/shared/model/rule.model';
import { RuleService } from './rule.service';

@Component({
    selector: 'jhi-rule-update',
    templateUrl: './rule-update.component.html'
})
export class RuleUpdateComponent implements OnInit {
    private _rule: IRule;
    isSaving: boolean;

    constructor(private ruleService: RuleService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rule }) => {
            this.rule = rule;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rule.id !== undefined) {
            this.subscribeToSaveResponse(this.ruleService.update(this.rule));
        } else {
            this.subscribeToSaveResponse(this.ruleService.create(this.rule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRule>>) {
        result.subscribe((res: HttpResponse<IRule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get rule() {
        return this._rule;
    }

    set rule(rule: IRule) {
        this._rule = rule;
    }
}
