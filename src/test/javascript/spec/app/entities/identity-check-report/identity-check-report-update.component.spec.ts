/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IdentityCheckReportUpdateComponent } from 'app/entities/identity-check-report/identity-check-report-update.component';
import { IdentityCheckReportService } from 'app/entities/identity-check-report/identity-check-report.service';
import { IdentityCheckReport } from 'app/shared/model/identity-check-report.model';

describe('Component Tests', () => {
    describe('IdentityCheckReport Management Update Component', () => {
        let comp: IdentityCheckReportUpdateComponent;
        let fixture: ComponentFixture<IdentityCheckReportUpdateComponent>;
        let service: IdentityCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IdentityCheckReportUpdateComponent]
            })
                .overrideTemplate(IdentityCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IdentityCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdentityCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IdentityCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.identityCheckReport = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IdentityCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.identityCheckReport = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
