/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OffenceComponent } from 'app/entities/offence/offence.component';
import { OffenceService } from 'app/entities/offence/offence.service';
import { Offence } from 'app/shared/model/offence.model';

describe('Component Tests', () => {
    describe('Offence Management Component', () => {
        let comp: OffenceComponent;
        let fixture: ComponentFixture<OffenceComponent>;
        let service: OffenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OffenceComponent],
                providers: []
            })
                .overrideTemplate(OffenceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OffenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffenceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Offence('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.offences[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
