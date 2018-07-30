/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LocalLanguageMediaCheckReportDetailComponent } from 'app/entities/local-language-media-check-report/local-language-media-check-report-detail.component';
import { LocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

describe('Component Tests', () => {
    describe('LocalLanguageMediaCheckReport Management Detail Component', () => {
        let comp: LocalLanguageMediaCheckReportDetailComponent;
        let fixture: ComponentFixture<LocalLanguageMediaCheckReportDetailComponent>;
        const route = ({ data: of({ localLanguageMediaCheckReport: new LocalLanguageMediaCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LocalLanguageMediaCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LocalLanguageMediaCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocalLanguageMediaCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.localLanguageMediaCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
