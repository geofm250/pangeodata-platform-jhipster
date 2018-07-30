/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LicenseCheckReportUpdateComponent } from 'app/entities/license-check-report/license-check-report-update.component';
import { LicenseCheckReportService } from 'app/entities/license-check-report/license-check-report.service';
import { LicenseCheckReport } from 'app/shared/model/license-check-report.model';

describe('Component Tests', () => {
    describe('LicenseCheckReport Management Update Component', () => {
        let comp: LicenseCheckReportUpdateComponent;
        let fixture: ComponentFixture<LicenseCheckReportUpdateComponent>;
        let service: LicenseCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LicenseCheckReportUpdateComponent]
            })
                .overrideTemplate(LicenseCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LicenseCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicenseCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LicenseCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.licenseCheckReport = entity;
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
                    const entity = new LicenseCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.licenseCheckReport = entity;
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
