/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DriversLicenseCheckReportUpdateComponent } from 'app/entities/drivers-license-check-report/drivers-license-check-report-update.component';
import { DriversLicenseCheckReportService } from 'app/entities/drivers-license-check-report/drivers-license-check-report.service';
import { DriversLicenseCheckReport } from 'app/shared/model/drivers-license-check-report.model';

describe('Component Tests', () => {
    describe('DriversLicenseCheckReport Management Update Component', () => {
        let comp: DriversLicenseCheckReportUpdateComponent;
        let fixture: ComponentFixture<DriversLicenseCheckReportUpdateComponent>;
        let service: DriversLicenseCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DriversLicenseCheckReportUpdateComponent]
            })
                .overrideTemplate(DriversLicenseCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DriversLicenseCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DriversLicenseCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DriversLicenseCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.driversLicenseCheckReport = entity;
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
                    const entity = new DriversLicenseCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.driversLicenseCheckReport = entity;
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
