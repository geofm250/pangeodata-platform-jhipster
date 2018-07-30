/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DirectorshipVerificationReportUpdateComponent } from 'app/entities/directorship-verification-report/directorship-verification-report-update.component';
import { DirectorshipVerificationReportService } from 'app/entities/directorship-verification-report/directorship-verification-report.service';
import { DirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';

describe('Component Tests', () => {
    describe('DirectorshipVerificationReport Management Update Component', () => {
        let comp: DirectorshipVerificationReportUpdateComponent;
        let fixture: ComponentFixture<DirectorshipVerificationReportUpdateComponent>;
        let service: DirectorshipVerificationReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DirectorshipVerificationReportUpdateComponent]
            })
                .overrideTemplate(DirectorshipVerificationReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DirectorshipVerificationReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirectorshipVerificationReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DirectorshipVerificationReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.directorshipVerificationReport = entity;
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
                    const entity = new DirectorshipVerificationReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.directorshipVerificationReport = entity;
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
