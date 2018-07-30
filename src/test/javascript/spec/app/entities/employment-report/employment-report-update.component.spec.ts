/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EmploymentReportUpdateComponent } from 'app/entities/employment-report/employment-report-update.component';
import { EmploymentReportService } from 'app/entities/employment-report/employment-report.service';
import { EmploymentReport } from 'app/shared/model/employment-report.model';

describe('Component Tests', () => {
    describe('EmploymentReport Management Update Component', () => {
        let comp: EmploymentReportUpdateComponent;
        let fixture: ComponentFixture<EmploymentReportUpdateComponent>;
        let service: EmploymentReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EmploymentReportUpdateComponent]
            })
                .overrideTemplate(EmploymentReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmploymentReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploymentReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmploymentReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employmentReport = entity;
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
                    const entity = new EmploymentReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employmentReport = entity;
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
