/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LocalLanguageMediaCheckReportDeleteDialogComponent } from 'app/entities/local-language-media-check-report/local-language-media-check-report-delete-dialog.component';
import { LocalLanguageMediaCheckReportService } from 'app/entities/local-language-media-check-report/local-language-media-check-report.service';

describe('Component Tests', () => {
    describe('LocalLanguageMediaCheckReport Management Delete Component', () => {
        let comp: LocalLanguageMediaCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<LocalLanguageMediaCheckReportDeleteDialogComponent>;
        let service: LocalLanguageMediaCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LocalLanguageMediaCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(LocalLanguageMediaCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocalLanguageMediaCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalLanguageMediaCheckReportService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
