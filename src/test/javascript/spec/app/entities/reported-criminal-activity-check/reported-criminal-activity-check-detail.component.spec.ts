/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReportedCriminalActivityCheckDetailComponent } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check-detail.component';
import { ReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

describe('Component Tests', () => {
    describe('ReportedCriminalActivityCheck Management Detail Component', () => {
        let comp: ReportedCriminalActivityCheckDetailComponent;
        let fixture: ComponentFixture<ReportedCriminalActivityCheckDetailComponent>;
        const route = ({ data: of({ reportedCriminalActivityCheck: new ReportedCriminalActivityCheck('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReportedCriminalActivityCheckDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReportedCriminalActivityCheckDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReportedCriminalActivityCheckDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.reportedCriminalActivityCheck).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
