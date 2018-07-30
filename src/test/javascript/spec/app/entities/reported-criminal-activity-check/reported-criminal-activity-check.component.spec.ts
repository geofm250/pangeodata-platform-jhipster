/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReportedCriminalActivityCheckComponent } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check.component';
import { ReportedCriminalActivityCheckService } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check.service';
import { ReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

describe('Component Tests', () => {
    describe('ReportedCriminalActivityCheck Management Component', () => {
        let comp: ReportedCriminalActivityCheckComponent;
        let fixture: ComponentFixture<ReportedCriminalActivityCheckComponent>;
        let service: ReportedCriminalActivityCheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReportedCriminalActivityCheckComponent],
                providers: []
            })
                .overrideTemplate(ReportedCriminalActivityCheckComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportedCriminalActivityCheckComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportedCriminalActivityCheckService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ReportedCriminalActivityCheck('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reportedCriminalActivityChecks[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
