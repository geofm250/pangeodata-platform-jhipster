/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderFormComponent } from 'app/entities/i-order-form/i-order-form.component';
import { IOrderFormService } from 'app/entities/i-order-form/i-order-form.service';
import { IOrderForm } from 'app/shared/model/i-order-form.model';

describe('Component Tests', () => {
    describe('IOrderForm Management Component', () => {
        let comp: IOrderFormComponent;
        let fixture: ComponentFixture<IOrderFormComponent>;
        let service: IOrderFormService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderFormComponent],
                providers: []
            })
                .overrideTemplate(IOrderFormComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IOrderFormComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IOrderFormService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IOrderForm('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.iOrderForms[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
