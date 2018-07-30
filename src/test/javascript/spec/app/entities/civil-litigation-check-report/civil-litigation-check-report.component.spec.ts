/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CivilLitigationCheckReportComponent } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report.component';
import { CivilLitigationCheckReportService } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report.service';
import { CivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

describe('Component Tests', () => {
    describe('CivilLitigationCheckReport Management Component', () => {
        let comp: CivilLitigationCheckReportComponent;
        let fixture: ComponentFixture<CivilLitigationCheckReportComponent>;
        let service: CivilLitigationCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CivilLitigationCheckReportComponent],
                providers: []
            })
                .overrideTemplate(CivilLitigationCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CivilLitigationCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilLitigationCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CivilLitigationCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.civilLitigationCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
