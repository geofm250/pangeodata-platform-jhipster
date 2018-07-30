/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderInputUpdateComponent } from 'app/entities/order-input/order-input-update.component';
import { OrderInputService } from 'app/entities/order-input/order-input.service';
import { OrderInput } from 'app/shared/model/order-input.model';

describe('Component Tests', () => {
    describe('OrderInput Management Update Component', () => {
        let comp: OrderInputUpdateComponent;
        let fixture: ComponentFixture<OrderInputUpdateComponent>;
        let service: OrderInputService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderInputUpdateComponent]
            })
                .overrideTemplate(OrderInputUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderInputUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderInputService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderInput('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderInput = entity;
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
                    const entity = new OrderInput();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderInput = entity;
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
