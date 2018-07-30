/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReportedCriminalActivityCheckUpdateComponent } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check-update.component';
import { ReportedCriminalActivityCheckService } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check.service';
import { ReportedCriminalActivityCheck } from 'app/shared/model/reported-criminal-activity-check.model';

describe('Component Tests', () => {
    describe('ReportedCriminalActivityCheck Management Update Component', () => {
        let comp: ReportedCriminalActivityCheckUpdateComponent;
        let fixture: ComponentFixture<ReportedCriminalActivityCheckUpdateComponent>;
        let service: ReportedCriminalActivityCheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReportedCriminalActivityCheckUpdateComponent]
            })
                .overrideTemplate(ReportedCriminalActivityCheckUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReportedCriminalActivityCheckUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportedCriminalActivityCheckService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReportedCriminalActivityCheck('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportedCriminalActivityCheck = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ReportedCriminalActivityCheck();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reportedCriminalActivityCheck = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
