/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEmploymentFormDeleteDialogComponent } from 'app/entities/order-employment-form/order-employment-form-delete-dialog.component';
import { OrderEmploymentFormService } from 'app/entities/order-employment-form/order-employment-form.service';

describe('Component Tests', () => {
    describe('OrderEmploymentForm Management Delete Component', () => {
        let comp: OrderEmploymentFormDeleteDialogComponent;
        let fixture: ComponentFixture<OrderEmploymentFormDeleteDialogComponent>;
        let service: OrderEmploymentFormService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEmploymentFormDeleteDialogComponent]
            })
                .overrideTemplate(OrderEmploymentFormDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderEmploymentFormDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEmploymentFormService);
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
