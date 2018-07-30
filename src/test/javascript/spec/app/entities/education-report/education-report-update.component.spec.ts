/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EducationReportUpdateComponent } from 'app/entities/education-report/education-report-update.component';
import { EducationReportService } from 'app/entities/education-report/education-report.service';
import { EducationReport } from 'app/shared/model/education-report.model';

describe('Component Tests', () => {
    describe('EducationReport Management Update Component', () => {
        let comp: EducationReportUpdateComponent;
        let fixture: ComponentFixture<EducationReportUpdateComponent>;
        let service: EducationReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EducationReportUpdateComponent]
            })
                .overrideTemplate(EducationReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EducationReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EducationReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EducationReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.educationReport = entity;
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
                    const entity = new EducationReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.educationReport = entity;
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
