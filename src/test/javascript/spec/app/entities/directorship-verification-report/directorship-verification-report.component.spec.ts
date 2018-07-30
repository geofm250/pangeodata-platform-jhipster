/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DirectorshipVerificationReportComponent } from 'app/entities/directorship-verification-report/directorship-verification-report.component';
import { DirectorshipVerificationReportService } from 'app/entities/directorship-verification-report/directorship-verification-report.service';
import { DirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';

describe('Component Tests', () => {
    describe('DirectorshipVerificationReport Management Component', () => {
        let comp: DirectorshipVerificationReportComponent;
        let fixture: ComponentFixture<DirectorshipVerificationReportComponent>;
        let service: DirectorshipVerificationReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DirectorshipVerificationReportComponent],
                providers: []
            })
                .overrideTemplate(DirectorshipVerificationReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DirectorshipVerificationReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirectorshipVerificationReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DirectorshipVerificationReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.directorshipVerificationReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
