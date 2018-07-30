/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { SocialMediaCheckReportComponent } from 'app/entities/social-media-check-report/social-media-check-report.component';
import { SocialMediaCheckReportService } from 'app/entities/social-media-check-report/social-media-check-report.service';
import { SocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

describe('Component Tests', () => {
    describe('SocialMediaCheckReport Management Component', () => {
        let comp: SocialMediaCheckReportComponent;
        let fixture: ComponentFixture<SocialMediaCheckReportComponent>;
        let service: SocialMediaCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [SocialMediaCheckReportComponent],
                providers: []
            })
                .overrideTemplate(SocialMediaCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialMediaCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialMediaCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SocialMediaCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.socialMediaCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
