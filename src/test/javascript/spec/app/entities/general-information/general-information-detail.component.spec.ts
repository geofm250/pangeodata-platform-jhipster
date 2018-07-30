/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { GeneralInformationDetailComponent } from 'app/entities/general-information/general-information-detail.component';
import { GeneralInformation } from 'app/shared/model/general-information.model';

describe('Component Tests', () => {
    describe('GeneralInformation Management Detail Component', () => {
        let comp: GeneralInformationDetailComponent;
        let fixture: ComponentFixture<GeneralInformationDetailComponent>;
        const route = ({ data: of({ generalInformation: new GeneralInformation('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [GeneralInformationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GeneralInformationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralInformationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.generalInformation).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
