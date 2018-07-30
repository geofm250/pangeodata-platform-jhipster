/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { BankruptcyCheckReportUpdateComponent } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report-update.component';
import { BankruptcyCheckReportService } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report.service';
import { BankruptcyCheckReport } from 'app/shared/model/bankruptcy-check-report.model';

describe('Component Tests', () => {
    describe('BankruptcyCheckReport Management Update Component', () => {
        let comp: BankruptcyCheckReportUpdateComponent;
        let fixture: ComponentFixture<BankruptcyCheckReportUpdateComponent>;
        let service: BankruptcyCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [BankruptcyCheckReportUpdateComponent]
            })
                .overrideTemplate(BankruptcyCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BankruptcyCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankruptcyCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BankruptcyCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankruptcyCheckReport = entity;
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
                    const entity = new BankruptcyCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bankruptcyCheckReport = entity;
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
