/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { SocialMediaCheckReportUpdateComponent } from 'app/entities/social-media-check-report/social-media-check-report-update.component';
import { SocialMediaCheckReportService } from 'app/entities/social-media-check-report/social-media-check-report.service';
import { SocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

describe('Component Tests', () => {
    describe('SocialMediaCheckReport Management Update Component', () => {
        let comp: SocialMediaCheckReportUpdateComponent;
        let fixture: ComponentFixture<SocialMediaCheckReportUpdateComponent>;
        let service: SocialMediaCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [SocialMediaCheckReportUpdateComponent]
            })
                .overrideTemplate(SocialMediaCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialMediaCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialMediaCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SocialMediaCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.socialMediaCheckReport = entity;
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
                    const entity = new SocialMediaCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.socialMediaCheckReport = entity;
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
