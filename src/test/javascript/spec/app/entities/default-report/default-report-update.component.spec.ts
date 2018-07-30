/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { DefaultReportUpdateComponent } from 'app/entities/default-report/default-report-update.component';
import { DefaultReportService } from 'app/entities/default-report/default-report.service';
import { DefaultReport } from 'app/shared/model/default-report.model';

describe('Component Tests', () => {
    describe('DefaultReport Management Update Component', () => {
        let comp: DefaultReportUpdateComponent;
        let fixture: ComponentFixture<DefaultReportUpdateComponent>;
        let service: DefaultReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [DefaultReportUpdateComponent]
            })
                .overrideTemplate(DefaultReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DefaultReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefaultReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DefaultReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defaultReport = entity;
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
                    const entity = new DefaultReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.defaultReport = entity;
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
