/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { PassportCheckReportDeleteDialogComponent } from 'app/entities/passport-check-report/passport-check-report-delete-dialog.component';
import { PassportCheckReportService } from 'app/entities/passport-check-report/passport-check-report.service';

describe('Component Tests', () => {
    describe('PassportCheckReport Management Delete Component', () => {
        let comp: PassportCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<PassportCheckReportDeleteDialogComponent>;
        let service: PassportCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [PassportCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(PassportCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PassportCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassportCheckReportService);
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
