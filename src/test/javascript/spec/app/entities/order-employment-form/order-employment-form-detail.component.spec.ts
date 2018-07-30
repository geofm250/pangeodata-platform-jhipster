/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEmploymentFormDetailComponent } from 'app/entities/order-employment-form/order-employment-form-detail.component';
import { OrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

describe('Component Tests', () => {
    describe('OrderEmploymentForm Management Detail Component', () => {
        let comp: OrderEmploymentFormDetailComponent;
        let fixture: ComponentFixture<OrderEmploymentFormDetailComponent>;
        const route = ({ data: of({ orderEmploymentForm: new OrderEmploymentForm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEmploymentFormDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderEmploymentFormDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderEmploymentFormDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderEmploymentForm).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
