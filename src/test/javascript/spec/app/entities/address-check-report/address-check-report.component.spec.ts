/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { AddressCheckReportComponent } from 'app/entities/address-check-report/address-check-report.component';
import { AddressCheckReportService } from 'app/entities/address-check-report/address-check-report.service';
import { AddressCheckReport } from 'app/shared/model/address-check-report.model';

describe('Component Tests', () => {
    describe('AddressCheckReport Management Component', () => {
        let comp: AddressCheckReportComponent;
        let fixture: ComponentFixture<AddressCheckReportComponent>;
        let service: AddressCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [AddressCheckReportComponent],
                providers: []
            })
                .overrideTemplate(AddressCheckReportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressCheckReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressCheckReportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AddressCheckReport('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.addressCheckReports[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
