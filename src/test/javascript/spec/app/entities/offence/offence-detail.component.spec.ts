/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OffenceDetailComponent } from 'app/entities/offence/offence-detail.component';
import { Offence } from 'app/shared/model/offence.model';

describe('Component Tests', () => {
    describe('Offence Management Detail Component', () => {
        let comp: OffenceDetailComponent;
        let fixture: ComponentFixture<OffenceDetailComponent>;
        const route = ({ data: of({ offence: new Offence('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OffenceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OffenceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OffenceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.offence).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
