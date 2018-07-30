/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderFileComponent } from 'app/entities/order-file/order-file.component';
import { OrderFileService } from 'app/entities/order-file/order-file.service';
import { OrderFile } from 'app/shared/model/order-file.model';

describe('Component Tests', () => {
    describe('OrderFile Management Component', () => {
        let comp: OrderFileComponent;
        let fixture: ComponentFixture<OrderFileComponent>;
        let service: OrderFileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderFileComponent],
                providers: []
            })
                .overrideTemplate(OrderFileComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderFileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderFileService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderFile('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderFiles[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
