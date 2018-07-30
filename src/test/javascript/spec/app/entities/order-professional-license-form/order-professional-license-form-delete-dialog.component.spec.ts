/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderProfessionalLicenseFormDeleteDialogComponent } from 'app/entities/order-professional-license-form/order-professional-license-form-delete-dialog.component';
import { OrderProfessionalLicenseFormService } from 'app/entities/order-professional-license-form/order-professional-license-form.service';

describe('Component Tests', () => {
    describe('OrderProfessionalLicenseForm Management Delete Component', () => {
        let comp: OrderProfessionalLicenseFormDeleteDialogComponent;
        let fixture: ComponentFixture<OrderProfessionalLicenseFormDeleteDialogComponent>;
        let service: OrderProfessionalLicenseFormService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderProfessionalLicenseFormDeleteDialogComponent]
            })
                .overrideTemplate(OrderProfessionalLicenseFormDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderProfessionalLicenseFormDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderProfessionalLicenseFormService);
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
