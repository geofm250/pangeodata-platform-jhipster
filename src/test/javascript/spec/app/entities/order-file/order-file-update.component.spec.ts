/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderFileUpdateComponent } from 'app/entities/order-file/order-file-update.component';
import { OrderFileService } from 'app/entities/order-file/order-file.service';
import { OrderFile } from 'app/shared/model/order-file.model';

describe('Component Tests', () => {
    describe('OrderFile Management Update Component', () => {
        let comp: OrderFileUpdateComponent;
        let fixture: ComponentFixture<OrderFileUpdateComponent>;
        let service: OrderFileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderFileUpdateComponent]
            })
                .overrideTemplate(OrderFileUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderFileUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderFileService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderFile('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderFile = entity;
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
                    const entity = new OrderFile();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderFile = entity;
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
