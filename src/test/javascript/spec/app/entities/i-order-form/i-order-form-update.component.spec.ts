/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderFormUpdateComponent } from 'app/entities/i-order-form/i-order-form-update.component';
import { IOrderFormService } from 'app/entities/i-order-form/i-order-form.service';
import { IOrderForm } from 'app/shared/model/i-order-form.model';

describe('Component Tests', () => {
    describe('IOrderForm Management Update Component', () => {
        let comp: IOrderFormUpdateComponent;
        let fixture: ComponentFixture<IOrderFormUpdateComponent>;
        let service: IOrderFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderFormUpdateComponent]
            })
                .overrideTemplate(IOrderFormUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IOrderFormUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderFormService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IOrderForm('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iOrderForm = entity;
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
                    const entity = new IOrderForm();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iOrderForm = entity;
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
