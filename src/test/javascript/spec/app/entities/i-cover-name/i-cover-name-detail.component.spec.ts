/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ICoverNameDetailComponent } from 'app/entities/i-cover-name/i-cover-name-detail.component';
import { ICoverName } from 'app/shared/model/i-cover-name.model';

describe('Component Tests', () => {
    describe('ICoverName Management Detail Component', () => {
        let comp: ICoverNameDetailComponent;
        let fixture: ComponentFixture<ICoverNameDetailComponent>;
        const route = ({ data: of({ iCoverName: new ICoverName('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ICoverNameDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ICoverNameDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ICoverNameDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.iCoverName).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
