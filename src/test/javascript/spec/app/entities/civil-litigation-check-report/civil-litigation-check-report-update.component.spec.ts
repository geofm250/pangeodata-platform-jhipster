/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CivilLitigationCheckReportUpdateComponent } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report-update.component';
import { CivilLitigationCheckReportService } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report.service';
import { CivilLitigationCheckReport } from 'app/shared/model/civil-litigation-check-report.model';

describe('Component Tests', () => {
    describe('CivilLitigationCheckReport Management Update Component', () => {
        let comp: CivilLitigationCheckReportUpdateComponent;
        let fixture: ComponentFixture<CivilLitigationCheckReportUpdateComponent>;
        let service: CivilLitigationCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CivilLitigationCheckReportUpdateComponent]
            })
                .overrideTemplate(CivilLitigationCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CivilLitigationCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilLitigationCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CivilLitigationCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.civilLitigationCheckReport = entity;
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
                    const entity = new CivilLitigationCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.civilLitigationCheckReport = entity;
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
