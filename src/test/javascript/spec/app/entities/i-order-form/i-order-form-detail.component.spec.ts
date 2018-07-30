/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IOrderFormDetailComponent } from 'app/entities/i-order-form/i-order-form-detail.component';
import { IOrderForm } from 'app/shared/model/i-order-form.model';

describe('Component Tests', () => {
    describe('IOrderForm Management Detail Component', () => {
        let comp: IOrderFormDetailComponent;
        let fixture: ComponentFixture<IOrderFormDetailComponent>;
        const route = ({ data: of({ iOrderForm: new IOrderForm('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IOrderFormDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IOrderFormDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IOrderFormDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iOrderForm).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
