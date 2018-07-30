/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { AddressCheckReportDetailComponent } from 'app/entities/address-check-report/address-check-report-detail.component';
import { AddressCheckReport } from 'app/shared/model/address-check-report.model';

describe('Component Tests', () => {
    describe('AddressCheckReport Management Detail Component', () => {
        let comp: AddressCheckReportDetailComponent;
        let fixture: ComponentFixture<AddressCheckReportDetailComponent>;
        const route = ({ data: of({ addressCheckReport: new AddressCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [AddressCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.addressCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
