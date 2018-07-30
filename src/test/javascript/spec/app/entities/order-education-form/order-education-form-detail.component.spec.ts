/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEducationFormDetailComponent } from 'app/entities/order-education-form/order-education-form-detail.component';
import { OrderEducationForm } from 'app/shared/model/order-education-form.model';

describe('Component Tests', () => {
    describe('OrderEducationForm Management Detail Component', () => {
        let comp: OrderEducationFormDetailComponent;
        let fixture: ComponentFixture<OrderEducationFormDetailComponent>;
        const route = ({ data: of({ orderEducationForm: new OrderEducationForm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEducationFormDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderEducationFormDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderEducationFormDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderEducationForm).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
