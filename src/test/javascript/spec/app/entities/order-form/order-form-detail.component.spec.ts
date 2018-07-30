/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderFormDetailComponent } from 'app/entities/order-form/order-form-detail.component';
import { OrderForm } from 'app/shared/model/order-form.model';

describe('Component Tests', () => {
    describe('OrderForm Management Detail Component', () => {
        let comp: OrderFormDetailComponent;
        let fixture: ComponentFixture<OrderFormDetailComponent>;
        const route = ({ data: of({ orderForm: new OrderForm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderFormDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderFormDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderFormDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderForm).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
