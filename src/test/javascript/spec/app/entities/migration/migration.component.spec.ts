/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { MigrationComponent } from 'app/entities/migration/migration.component';
import { MigrationService } from 'app/entities/migration/migration.service';
import { Migration } from 'app/shared/model/migration.model';

describe('Component Tests', () => {
    describe('Migration Management Component', () => {
        let comp: MigrationComponent;
        let fixture: ComponentFixture<MigrationComponent>;
        let service: MigrationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [MigrationComponent],
                providers: []
            })
                .overrideTemplate(MigrationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MigrationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MigrationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Migration('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.migrations[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
