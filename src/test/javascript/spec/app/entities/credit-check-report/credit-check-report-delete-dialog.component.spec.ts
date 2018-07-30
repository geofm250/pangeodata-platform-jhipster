/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CreditCheckReportDeleteDialogComponent } from 'app/entities/credit-check-report/credit-check-report-delete-dialog.component';
import { CreditCheckReportService } from 'app/entities/credit-check-report/credit-check-report.service';

describe('Component Tests', () => {
    describe('CreditCheckReport Management Delete Component', () => {
        let comp: CreditCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<CreditCheckReportDeleteDialogComponent>;
        let service: CreditCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CreditCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(CreditCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CreditCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CreditCheckReportService);
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
