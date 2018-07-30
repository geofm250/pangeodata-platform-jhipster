/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PoliticallyExposedPersonsCheckReportUpdateComponent } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report-update.component';
import { PoliticallyExposedPersonsCheckReportService } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report.service';
import { PoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

describe('Component Tests', () => {
    describe('PoliticallyExposedPersonsCheckReport Management Update Component', () => {
        let comp: PoliticallyExposedPersonsCheckReportUpdateComponent;
        let fixture: ComponentFixture<PoliticallyExposedPersonsCheckReportUpdateComponent>;
        let service: PoliticallyExposedPersonsCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PoliticallyExposedPersonsCheckReportUpdateComponent]
            })
                .overrideTemplate(PoliticallyExposedPersonsCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PoliticallyExposedPersonsCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticallyExposedPersonsCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PoliticallyExposedPersonsCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.politicallyExposedPersonsCheckReport = entity;
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
                    const entity = new PoliticallyExposedPersonsCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.politicallyExposedPersonsCheckReport = entity;
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
