/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { GeneralInformationComponent } from 'app/entities/general-information/general-information.component';
import { GeneralInformationService } from 'app/entities/general-information/general-information.service';
import { GeneralInformation } from 'app/shared/model/general-information.model';

describe('Component Tests', () => {
    describe('GeneralInformation Management Component', () => {
        let comp: GeneralInformationComponent;
        let fixture: ComponentFixture<GeneralInformationComponent>;
        let service: GeneralInformationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [GeneralInformationComponent],
                providers: []
            })
                .overrideTemplate(GeneralInformationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeneralInformationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralInformationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GeneralInformation('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.generalInformations[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
