/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderReportDeleteDialogComponent } from 'app/entities/i-order-report/i-order-report-delete-dialog.component';
import { IOrderReportService } from 'app/entities/i-order-report/i-order-report.service';

describe('Component Tests', () => {
    describe('IOrderReport Management Delete Component', () => {
        let comp: IOrderReportDeleteDialogComponent;
        let fixture: ComponentFixture<IOrderReportDeleteDialogComponent>;
        let service: IOrderReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderReportDeleteDialogComponent]
            })
                .overrideTemplate(IOrderReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IOrderReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderReportService);
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
