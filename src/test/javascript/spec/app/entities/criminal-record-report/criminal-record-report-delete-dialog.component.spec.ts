/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CriminalRecordReportDeleteDialogComponent } from 'app/entities/criminal-record-report/criminal-record-report-delete-dialog.component';
import { CriminalRecordReportService } from 'app/entities/criminal-record-report/criminal-record-report.service';

describe('Component Tests', () => {
    describe('CriminalRecordReport Management Delete Component', () => {
        let comp: CriminalRecordReportDeleteDialogComponent;
        let fixture: ComponentFixture<CriminalRecordReportDeleteDialogComponent>;
        let service: CriminalRecordReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CriminalRecordReportDeleteDialogComponent]
            })
                .overrideTemplate(CriminalRecordReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CriminalRecordReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CriminalRecordReportService);
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
