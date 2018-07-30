/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderFormUpdateComponent } from 'app/entities/order-form/order-form-update.component';
import { OrderFormService } from 'app/entities/order-form/order-form.service';
import { OrderForm } from 'app/shared/model/order-form.model';

describe('Component Tests', () => {
    describe('OrderForm Management Update Component', () => {
        let comp: OrderFormUpdateComponent;
        let fixture: ComponentFixture<OrderFormUpdateComponent>;
        let service: OrderFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderFormUpdateComponent]
            })
                .overrideTemplate(OrderFormUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderFormUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderFormService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderForm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderForm = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderForm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderForm = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
