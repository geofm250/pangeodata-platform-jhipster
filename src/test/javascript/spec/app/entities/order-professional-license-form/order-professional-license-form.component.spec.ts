/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderProfessionalLicenseFormComponent } from 'app/entities/order-professional-license-form/order-professional-license-form.component';
import { OrderProfessionalLicenseFormService } from 'app/entities/order-professional-license-form/order-professional-license-form.service';
import { OrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

describe('Component Tests', () => {
    describe('OrderProfessionalLicenseForm Management Component', () => {
        let comp: OrderProfessionalLicenseFormComponent;
        let fixture: ComponentFixture<OrderProfessionalLicenseFormComponent>;
        let service: OrderProfessionalLicenseFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderProfessionalLicenseFormComponent],
                providers: []
            })
                .overrideTemplate(OrderProfessionalLicenseFormComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderProfessionalLicenseFormComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderProfessionalLicenseFormService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderProfessionalLicenseForm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderProfessionalLicenseForms[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
