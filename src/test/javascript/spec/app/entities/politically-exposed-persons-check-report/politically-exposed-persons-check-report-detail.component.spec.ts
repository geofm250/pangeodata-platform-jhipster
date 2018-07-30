/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PoliticallyExposedPersonsCheckReportDetailComponent } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report-detail.component';
import { PoliticallyExposedPersonsCheckReport } from 'app/shared/model/politically-exposed-persons-check-report.model';

describe('Component Tests', () => {
    describe('PoliticallyExposedPersonsCheckReport Management Detail Component', () => {
        let comp: PoliticallyExposedPersonsCheckReportDetailComponent;
        let fixture: ComponentFixture<PoliticallyExposedPersonsCheckReportDetailComponent>;
        const route = ({
            data: of({ politicallyExposedPersonsCheckReport: new PoliticallyExposedPersonsCheckReport('123') })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PoliticallyExposedPersonsCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PoliticallyExposedPersonsCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PoliticallyExposedPersonsCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.politicallyExposedPersonsCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
