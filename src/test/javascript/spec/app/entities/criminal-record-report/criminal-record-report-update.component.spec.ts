/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CriminalRecordReportUpdateComponent } from 'app/entities/criminal-record-report/criminal-record-report-update.component';
import { CriminalRecordReportService } from 'app/entities/criminal-record-report/criminal-record-report.service';
import { CriminalRecordReport } from 'app/shared/model/criminal-record-report.model';

describe('Component Tests', () => {
    describe('CriminalRecordReport Management Update Component', () => {
        let comp: CriminalRecordReportUpdateComponent;
        let fixture: ComponentFixture<CriminalRecordReportUpdateComponent>;
        let service: CriminalRecordReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CriminalRecordReportUpdateComponent]
            })
                .overrideTemplate(CriminalRecordReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CriminalRecordReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CriminalRecordReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CriminalRecordReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.criminalRecordReport = entity;
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
                    const entity = new CriminalRecordReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.criminalRecordReport = entity;
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
