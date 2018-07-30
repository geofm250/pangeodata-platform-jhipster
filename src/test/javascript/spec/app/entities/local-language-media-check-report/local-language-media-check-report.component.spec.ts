/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LocalLanguageMediaCheckReportComponent } from 'app/entities/local-language-media-check-report/local-language-media-check-report.component';
import { LocalLanguageMediaCheckReportService } from 'app/entities/local-language-media-check-report/local-language-media-check-report.service';
import { LocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

describe('Component Tests', () => {
    describe('LocalLanguageMediaCheckReport Management Component', () => {
        let comp: LocalLanguageMediaCheckReportComponent;
        let fixture: ComponentFixture<LocalLanguageMediaCheckReportComponent>;
        let service: LocalLanguageMediaCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LocalLanguageMediaCheckReportComponent],
                providers: []
            })
                .overrideTemplate(LocalLanguageMediaCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocalLanguageMediaCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalLanguageMediaCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocalLanguageMediaCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.localLanguageMediaCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
