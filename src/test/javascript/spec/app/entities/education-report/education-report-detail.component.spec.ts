/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EducationReportDetailComponent } from 'app/entities/education-report/education-report-detail.component';
import { EducationReport } from 'app/shared/model/education-report.model';

describe('Component Tests', () => {
    describe('EducationReport Management Detail Component', () => {
        let comp: EducationReportDetailComponent;
        let fixture: ComponentFixture<EducationReportDetailComponent>;
        const route = ({ data: of({ educationReport: new EducationReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EducationReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EducationReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EducationReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.educationReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
