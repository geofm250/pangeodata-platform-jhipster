/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ProductCountryDeleteDialogComponent } from 'app/entities/product-country/product-country-delete-dialog.component';
import { ProductCountryService } from 'app/entities/product-country/product-country.service';

describe('Component Tests', () => {
    describe('ProductCountry Management Delete Component', () => {
        let comp: ProductCountryDeleteDialogComponent;
        let fixture: ComponentFixture<ProductCountryDeleteDialogComponent>;
        let service: ProductCountryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ProductCountryDeleteDialogComponent]
            })
                .overrideTemplate(ProductCountryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductCountryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCountryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
