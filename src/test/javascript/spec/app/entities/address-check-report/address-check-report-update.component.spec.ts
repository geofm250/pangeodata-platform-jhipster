/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { AddressCheckReportUpdateComponent } from 'app/entities/address-check-report/address-check-report-update.component';
import { AddressCheckReportService } from 'app/entities/address-check-report/address-check-report.service';
import { AddressCheckReport } from 'app/shared/model/address-check-report.model';

describe('Component Tests', () => {
    describe('AddressCheckReport Management Update Component', () => {
        let comp: AddressCheckReportUpdateComponent;
        let fixture: ComponentFixture<AddressCheckReportUpdateComponent>;
        let service: AddressCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [AddressCheckReportUpdateComponent]
            })
                .overrideTemplate(AddressCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AddressCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.addressCheckReport = entity;
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
                    const entity = new AddressCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.addressCheckReport = entity;
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
