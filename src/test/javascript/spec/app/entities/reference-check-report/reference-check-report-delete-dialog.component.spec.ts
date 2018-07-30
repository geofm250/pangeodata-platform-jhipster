/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReferenceCheckReportDeleteDialogComponent } from 'app/entities/reference-check-report/reference-check-report-delete-dialog.component';
import { ReferenceCheckReportService } from 'app/entities/reference-check-report/reference-check-report.service';

describe('Component Tests', () => {
    describe('ReferenceCheckReport Management Delete Component', () => {
        let comp: ReferenceCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<ReferenceCheckReportDeleteDialogComponent>;
        let service: ReferenceCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReferenceCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(ReferenceCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReferenceCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceCheckReportService);
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
