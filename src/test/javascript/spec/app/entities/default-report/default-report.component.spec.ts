/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DefaultReportComponent } from 'app/entities/default-report/default-report.component';
import { DefaultReportService } from 'app/entities/default-report/default-report.service';
import { DefaultReport } from 'app/shared/model/default-report.model';

describe('Component Tests', () => {
    describe('DefaultReport Management Component', () => {
        let comp: DefaultReportComponent;
        let fixture: ComponentFixture<DefaultReportComponent>;
        let service: DefaultReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DefaultReportComponent],
                providers: []
            })
                .overrideTemplate(DefaultReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefaultReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DefaultReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.defaultReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
