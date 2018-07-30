/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IdentityCheckReportDetailComponent } from 'app/entities/identity-check-report/identity-check-report-detail.component';
import { IdentityCheckReport } from 'app/shared/model/identity-check-report.model';

describe('Component Tests', () => {
    describe('IdentityCheckReport Management Detail Component', () => {
        let comp: IdentityCheckReportDetailComponent;
        let fixture: ComponentFixture<IdentityCheckReportDetailComponent>;
        const route = ({ data: of({ identityCheckReport: new IdentityCheckReport('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IdentityCheckReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IdentityCheckReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IdentityCheckReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.identityCheckReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
