/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PassportCheckReportDetailComponent } from 'app/entities/passport-check-report/passport-check-report-detail.component';
import { PassportCheckReport } from 'app/shared/model/passport-check-report.model';

describe('Component Tests', () => {
    describe('PassportCheckReport Management Detail Component', () => {
        let comp: PassportCheckReportDetailComponent;
        let fixture: ComponentFixture<PassportCheckReportDetailComponent>;
        const route = ({ data: of({ passportCheckReport: new PassportCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PassportCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PassportCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PassportCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.passportCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
