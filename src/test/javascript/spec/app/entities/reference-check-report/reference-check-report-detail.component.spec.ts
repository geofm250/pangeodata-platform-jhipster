/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReferenceCheckReportDetailComponent } from 'app/entities/reference-check-report/reference-check-report-detail.component';
import { ReferenceCheckReport } from 'app/shared/model/reference-check-report.model';

describe('Component Tests', () => {
    describe('ReferenceCheckReport Management Detail Component', () => {
        let comp: ReferenceCheckReportDetailComponent;
        let fixture: ComponentFixture<ReferenceCheckReportDetailComponent>;
        const route = ({ data: of({ referenceCheckReport: new ReferenceCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReferenceCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReferenceCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReferenceCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.referenceCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
