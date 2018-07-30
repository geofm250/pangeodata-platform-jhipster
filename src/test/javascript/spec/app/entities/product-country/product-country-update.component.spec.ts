/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ProductCountryUpdateComponent } from 'app/entities/product-country/product-country-update.component';
import { ProductCountryService } from 'app/entities/product-country/product-country.service';
import { ProductCountry } from 'app/shared/model/product-country.model';

describe('Component Tests', () => {
    describe('ProductCountry Management Update Component', () => {
        let comp: ProductCountryUpdateComponent;
        let fixture: ComponentFixture<ProductCountryUpdateComponent>;
        let service: ProductCountryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ProductCountryUpdateComponent]
            })
                .overrideTemplate(ProductCountryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductCountryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCountryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductCountry('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productCountry = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductCountry();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productCountry = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
