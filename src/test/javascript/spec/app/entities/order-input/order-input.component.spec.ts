/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderInputComponent } from 'app/entities/order-input/order-input.component';
import { OrderInputService } from 'app/entities/order-input/order-input.service';
import { OrderInput } from 'app/shared/model/order-input.model';

describe('Component Tests', () => {
    describe('OrderInput Management Component', () => {
        let comp: OrderInputComponent;
        let fixture: ComponentFixture<OrderInputComponent>;
        let service: OrderInputService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderInputComponent],
                providers: []
            })
                .overrideTemplate(OrderInputComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderInputComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderInputService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderInput('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderInputs[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
