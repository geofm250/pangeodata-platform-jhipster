/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LocalLanguageMediaCheckReportUpdateComponent } from 'app/entities/local-language-media-check-report/local-language-media-check-report-update.component';
import { LocalLanguageMediaCheckReportService } from 'app/entities/local-language-media-check-report/local-language-media-check-report.service';
import { LocalLanguageMediaCheckReport } from 'app/shared/model/local-language-media-check-report.model';

describe('Component Tests', () => {
    describe('LocalLanguageMediaCheckReport Management Update Component', () => {
        let comp: LocalLanguageMediaCheckReportUpdateComponent;
        let fixture: ComponentFixture<LocalLanguageMediaCheckReportUpdateComponent>;
        let service: LocalLanguageMediaCheckReportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LocalLanguageMediaCheckReportUpdateComponent]
            })
                .overrideTemplate(LocalLanguageMediaCheckReportUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocalLanguageMediaCheckReportUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalLanguageMediaCheckReportService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocalLanguageMediaCheckReport('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.localLanguageMediaCheckReport = entity;
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
                    const entity = new LocalLanguageMediaCheckReport();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.localLanguageMediaCheckReport = entity;
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
