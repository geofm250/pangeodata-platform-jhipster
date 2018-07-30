/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEducationFormDeleteDialogComponent } from 'app/entities/order-education-form/order-education-form-delete-dialog.component';
import { OrderEducationFormService } from 'app/entities/order-education-form/order-education-form.service';

describe('Component Tests', () => {
    describe('OrderEducationForm Management Delete Component', () => {
        let comp: OrderEducationFormDeleteDialogComponent;
        let fixture: ComponentFixture<OrderEducationFormDeleteDialogComponent>;
        let service: OrderEducationFormService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEducationFormDeleteDialogComponent]
            })
                .overrideTemplate(OrderEducationFormDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderEducationFormDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEducationFormService);
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
