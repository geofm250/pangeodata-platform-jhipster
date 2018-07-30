/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PassportCheckReportUpdateComponent } from 'app/entities/passport-check-report/passport-check-report-update.component';
import { PassportCheckReportService } from 'app/entities/passport-check-report/passport-check-report.service';
import { PassportCheckReport } from 'app/shared/model/passport-check-report.model';

describe('Component Tests', () => {
    describe('PassportCheckReport Management Update Component', () => {
        let comp: PassportCheckReportUpdateComponent;
        let fixture: ComponentFixture<PassportCheckReportUpdateComponent>;
        let service: PassportCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PassportCheckReportUpdateComponent]
            })
                .overrideTemplate(PassportCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PassportCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassportCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PassportCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.passportCheckReport = entity;
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
                    const entity = new PassportCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.passportCheckReport = entity;
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
