/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEmploymentFormComponent } from 'app/entities/order-employment-form/order-employment-form.component';
import { OrderEmploymentFormService } from 'app/entities/order-employment-form/order-employment-form.service';
import { OrderEmploymentForm } from 'app/shared/model/order-employment-form.model';

describe('Component Tests', () => {
    describe('OrderEmploymentForm Management Component', () => {
        let comp: OrderEmploymentFormComponent;
        let fixture: ComponentFixture<OrderEmploymentFormComponent>;
        let service: OrderEmploymentFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEmploymentFormComponent],
                providers: []
            })
                .overrideTemplate(OrderEmploymentFormComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderEmploymentFormComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEmploymentFormService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderEmploymentForm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderEmploymentForms[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
