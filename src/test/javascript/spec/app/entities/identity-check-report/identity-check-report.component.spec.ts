/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IdentityCheckReportComponent } from 'app/entities/identity-check-report/identity-check-report.component';
import { IdentityCheckReportService } from 'app/entities/identity-check-report/identity-check-report.service';
import { IdentityCheckReport } from 'app/shared/model/identity-check-report.model';

describe('Component Tests', () => {
    describe('IdentityCheckReport Management Component', () => {
        let comp: IdentityCheckReportComponent;
        let fixture: ComponentFixture<IdentityCheckReportComponent>;
        let service: IdentityCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IdentityCheckReportComponent],
                providers: []
            })
                .overrideTemplate(IdentityCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IdentityCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdentityCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IdentityCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.identityCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
