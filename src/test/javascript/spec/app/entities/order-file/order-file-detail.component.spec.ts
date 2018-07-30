/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OrderFileDetailComponent } from 'app/entities/order-file/order-file-detail.component';
import { OrderFile } from 'app/shared/model/order-file.model';

describe('Component Tests', () => {
    describe('OrderFile Management Detail Component', () => {
        let comp: OrderFileDetailComponent;
        let fixture: ComponentFixture<OrderFileDetailComponent>;
        const route = ({ data: of({ orderFile: new OrderFile('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OrderFileDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderFileDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderFileDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderFile).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
