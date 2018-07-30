/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ProductCountryDetailComponent } from 'app/entities/product-country/product-country-detail.component';
import { ProductCountry } from 'app/shared/model/product-country.model';

describe('Component Tests', () => {
    describe('ProductCountry Management Detail Component', () => {
        let comp: ProductCountryDetailComponent;
        let fixture: ComponentFixture<ProductCountryDetailComponent>;
        const route = ({ data: of({ productCountry: new ProductCountry('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ProductCountryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductCountryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductCountryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productCountry).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
