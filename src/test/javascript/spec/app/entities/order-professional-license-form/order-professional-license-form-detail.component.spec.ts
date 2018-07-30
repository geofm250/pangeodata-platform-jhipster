/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderProfessionalLicenseFormDetailComponent } from 'app/entities/order-professional-license-form/order-professional-license-form-detail.component';
import { OrderProfessionalLicenseForm } from 'app/shared/model/order-professional-license-form.model';

describe('Component Tests', () => {
    describe('OrderProfessionalLicenseForm Management Detail Component', () => {
        let comp: OrderProfessionalLicenseFormDetailComponent;
        let fixture: ComponentFixture<OrderProfessionalLicenseFormDetailComponent>;
        const route = ({ data: of({ orderProfessionalLicenseForm: new OrderProfessionalLicenseForm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderProfessionalLicenseFormDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderProfessionalLicenseFormDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderProfessionalLicenseFormDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderProfessionalLicenseForm).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
