/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { SocialMediaCheckReportDetailComponent } from 'app/entities/social-media-check-report/social-media-check-report-detail.component';
import { SocialMediaCheckReport } from 'app/shared/model/social-media-check-report.model';

describe('Component Tests', () => {
    describe('SocialMediaCheckReport Management Detail Component', () => {
        let comp: SocialMediaCheckReportDetailComponent;
        let fixture: ComponentFixture<SocialMediaCheckReportDetailComponent>;
        const route = ({ data: of({ socialMediaCheckReport: new SocialMediaCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [SocialMediaCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SocialMediaCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SocialMediaCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.socialMediaCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
