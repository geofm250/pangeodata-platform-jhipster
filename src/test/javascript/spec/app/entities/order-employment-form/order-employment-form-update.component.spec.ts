/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEmploymentFormUpdateComponent } from 'app/entities/order-employment-form/order-employment-form-update.component';
import { OrderEmploymentFormService } from 'app/entities/order-employment-form/order-employment-form.service';
import { OrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

describe('Component Tests', () => {
    describe('OrderEmploymentForm Management Update Component', () => {
        let comp: OrderEmploymentFormUpdateComponent;
        let fixture: ComponentFixture<OrderEmploymentFormUpdateComponent>;
        let service: OrderEmploymentFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEmploymentFormUpdateComponent]
            })
                .overrideTemplate(OrderEmploymentFormUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderEmploymentFormUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEmploymentFormService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderEmploymentForm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderEmploymentForm = entity;
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
                    const entity = new OrderEmploymentForm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderEmploymentForm = entity;
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
