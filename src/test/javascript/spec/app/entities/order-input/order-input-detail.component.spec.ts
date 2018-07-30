/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderInputDetailComponent } from 'app/entities/order-input/order-input-detail.component';
import { OrderInput } from 'app/shared/model/order-input.model';

describe('Component Tests', () => {
    describe('OrderInput Management Detail Component', () => {
        let comp: OrderInputDetailComponent;
        let fixture: ComponentFixture<OrderInputDetailComponent>;
        const route = ({ data: of({ orderInput: new OrderInput('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderInputDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderInputDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderInputDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderInput).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
