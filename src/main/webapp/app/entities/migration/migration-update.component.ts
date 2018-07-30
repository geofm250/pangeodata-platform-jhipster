import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMigration } from 'app/shared/model/migration.model';
import { MigrationService } from './migration.service';

@Component({
    selector: 'jhi-migration-update',
    templateUrl: './migration-update.component.html'
})
export class MigrationUpdateComponent implements OnInit {
    private _migration: IMigration;
    isSaving: boolean;

    constructor(private migrationService: MigrationService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ migration }) => {
            this.migration = migration;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.migration.id !== undefined) {
            this.subscribeToSaveResponse(this.migrationService.update(this.migration));
        } else {
            this.subscribeToSaveResponse(this.migrationService.create(this.migration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMigration>>) {
        result.subscribe((res: HttpResponse<IMigration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get migration() {
        return this._migration;
    }

    set migration(migration: IMigration) {
        this._migration = migration;
    }
}
