/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CivilLitigationCheckReportDetailComponent } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report-detail.component';
import { CivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

describe('Component Tests', () => {
    describe('CivilLitigationCheckReport Management Detail Component', () => {
        let comp: CivilLitigationCheckReportDetailComponent;
        let fixture: ComponentFixture<CivilLitigationCheckReportDetailComponent>;
        const route = ({ data: of({ civilLitigationCheckReport: new CivilLitigationCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CivilLitigationCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CivilLitigationCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CivilLitigationCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.civilLitigationCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
