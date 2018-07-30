/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReferenceCheckReportUpdateComponent } from 'app/entities/reference-check-report/reference-check-report-update.component';
import { ReferenceCheckReportService } from 'app/entities/reference-check-report/reference-check-report.service';
import { ReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

describe('Component Tests', () => {
    describe('ReferenceCheckReport Management Update Component', () => {
        let comp: ReferenceCheckReportUpdateComponent;
        let fixture: ComponentFixture<ReferenceCheckReportUpdateComponent>;
        let service: ReferenceCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReferenceCheckReportUpdateComponent]
            })
                .overrideTemplate(ReferenceCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReferenceCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReferenceCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.referenceCheckReport = entity;
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
                    const entity = new ReferenceCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.referenceCheckReport = entity;
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
