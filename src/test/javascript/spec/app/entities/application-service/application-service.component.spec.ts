/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ApplicationServiceComponent } from 'app/entities/application-service/application-service.component';
import { ApplicationServiceService } from 'app/entities/application-service/application-service.service';
import { ApplicationService } from 'app/shared/model/application-service.model';

describe('Component Tests', () => {
    describe('ApplicationService Management Component', () => {
        let comp: ApplicationServiceComponent;
        let fixture: ComponentFixture<ApplicationServiceComponent>;
        let service: ApplicationServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ApplicationServiceComponent],
                providers: []
            })
                .overrideTemplate(ApplicationServiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationServiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ApplicationService('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.applicationServices[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
