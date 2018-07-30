/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderProfessionalLicenseFormUpdateComponent } from 'app/entities/order-professional-license-form/order-professional-license-form-update.component';
import { OrderProfessionalLicenseFormService } from 'app/entities/order-professional-license-form/order-professional-license-form.service';
import { OrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

describe('Component Tests', () => {
    describe('OrderProfessionalLicenseForm Management Update Component', () => {
        let comp: OrderProfessionalLicenseFormUpdateComponent;
        let fixture: ComponentFixture<OrderProfessionalLicenseFormUpdateComponent>;
        let service: OrderProfessionalLicenseFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderProfessionalLicenseFormUpdateComponent]
            })
                .overrideTemplate(OrderProfessionalLicenseFormUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderProfessionalLicenseFormUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderProfessionalLicenseFormService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderProfessionalLicenseForm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderProfessionalLicenseForm = entity;
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
                    const entity = new OrderProfessionalLicenseForm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderProfessionalLicenseForm = entity;
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
