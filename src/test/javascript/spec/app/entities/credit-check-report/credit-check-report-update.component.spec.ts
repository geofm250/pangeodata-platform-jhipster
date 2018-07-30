/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CreditCheckReportUpdateComponent } from 'app/entities/credit-check-report/credit-check-report-update.component';
import { CreditCheckReportService } from 'app/entities/credit-check-report/credit-check-report.service';
import { CreditCheckReport } from 'app/shared/model/credit-check-report.model';

describe('Component Tests', () => {
    describe('CreditCheckReport Management Update Component', () => {
        let comp: CreditCheckReportUpdateComponent;
        let fixture: ComponentFixture<CreditCheckReportUpdateComponent>;
        let service: CreditCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CreditCheckReportUpdateComponent]
            })
                .overrideTemplate(CreditCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CreditCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CreditCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.creditCheckReport = entity;
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
                    const entity = new CreditCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.creditCheckReport = entity;
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
