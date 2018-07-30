/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DefaultReportDetailComponent } from 'app/entities/default-report/default-report-detail.component';
import { DefaultReport } from 'app/shared/model/default-report.model';

describe('Component Tests', () => {
    describe('DefaultReport Management Detail Component', () => {
        let comp: DefaultReportDetailComponent;
        let fixture: ComponentFixture<DefaultReportDetailComponent>;
        const route = ({ data: of({ defaultReport: new DefaultReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DefaultReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DefaultReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DefaultReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.defaultReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
