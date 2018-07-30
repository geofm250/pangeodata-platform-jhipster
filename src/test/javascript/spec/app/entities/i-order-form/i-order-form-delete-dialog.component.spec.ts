/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderFormDeleteDialogComponent } from 'app/entities/i-order-form/i-order-form-delete-dialog.component';
import { IOrderFormService } from 'app/entities/i-order-form/i-order-form.service';

describe('Component Tests', () => {
    describe('IOrderForm Management Delete Component', () => {
        let comp: IOrderFormDeleteDialogComponent;
        let fixture: ComponentFixture<IOrderFormDeleteDialogComponent>;
        let service: IOrderFormService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderFormDeleteDialogComponent]
            })
                .overrideTemplate(IOrderFormDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IOrderFormDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderFormService);
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
