/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PoliticallyExposedPersonsCheckReportDeleteDialogComponent } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report-delete-dialog.component';
import { PoliticallyExposedPersonsCheckReportService } from 'app/entities/politically-exposed-persons-check-report/politically-exposed-persons-check-report.service';

describe('Component Tests', () => {
    describe('PoliticallyExposedPersonsCheckReport Management Delete Component', () => {
        let comp: PoliticallyExposedPersonsCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<PoliticallyExposedPersonsCheckReportDeleteDialogComponent>;
        let service: PoliticallyExposedPersonsCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PoliticallyExposedPersonsCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(PoliticallyExposedPersonsCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PoliticallyExposedPersonsCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PoliticallyExposedPersonsCheckReportService);
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
