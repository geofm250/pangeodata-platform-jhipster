/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DirectorshipVerificationReportDetailComponent } from 'app/entities/directorship-verification-report/directorship-verification-report-detail.component';
import { DirectorshipVerificationReport } from 'app/shared/model/directorship-verification-report.model';

describe('Component Tests', () => {
    describe('DirectorshipVerificationReport Management Detail Component', () => {
        let comp: DirectorshipVerificationReportDetailComponent;
        let fixture: ComponentFixture<DirectorshipVerificationReportDetailComponent>;
        const route = ({
            data: of({ directorshipVerificationReport: new DirectorshipVerificationReport('123') })
        } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DirectorshipVerificationReportDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DirectorshipVerificationReportDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DirectorshipVerificationReportDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.directorshipVerificationReport).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
