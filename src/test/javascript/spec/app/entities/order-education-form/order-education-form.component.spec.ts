/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderEducationFormComponent } from 'app/entities/order-education-form/order-education-form.component';
import { OrderEducationFormService } from 'app/entities/order-education-form/order-education-form.service';
import { OrderEducationForm } from 'app/shared/model/order-education-form.model';

describe('Component Tests', () => {
    describe('OrderEducationForm Management Component', () => {
        let comp: OrderEducationFormComponent;
        let fixture: ComponentFixture<OrderEducationFormComponent>;
        let service: OrderEducationFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderEducationFormComponent],
                providers: []
            })
                .overrideTemplate(OrderEducationFormComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderEducationFormComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderEducationFormService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderEducationForm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderEducationForms[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
