/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderReportUpdateComponent } from 'app/entities/i-order-report/i-order-report-update.component';
import { IOrderReportService } from 'app/entities/i-order-report/i-order-report.service';
import { IOrderReport } from 'app/shared/model/i-order-report.model';

describe('Component Tests', () => {
    describe('IOrderReport Management Update Component', () => {
        let comp: IOrderReportUpdateComponent;
        let fixture: ComponentFixture<IOrderReportUpdateComponent>;
        let service: IOrderReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderReportUpdateComponent]
            })
                .overrideTemplate(IOrderReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IOrderReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IOrderReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iOrderReport = entity;
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
                    const entity = new IOrderReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iOrderReport = entity;
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
