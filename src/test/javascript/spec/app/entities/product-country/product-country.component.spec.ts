/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ProductCountryComponent } from 'app/entities/product-country/product-country.component';
import { ProductCountryService } from 'app/entities/product-country/product-country.service';
import { ProductCountry } from 'app/shared/model/product-country.model';

describe('Component Tests', () => {
    describe('ProductCountry Management Component', () => {
        let comp: ProductCountryComponent;
        let fixture: ComponentFixture<ProductCountryComponent>;
        let service: ProductCountryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ProductCountryComponent],
                providers: []
            })
                .overrideTemplate(ProductCountryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductCountryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCountryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductCountry('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productCountries[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
