/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ApplicationServiceDetailComponent } from 'app/entities/application-service/application-service-detail.component';
import { ApplicationService } from 'app/shared/model/application-service.model';

describe('Component Tests', () => {
    describe('ApplicationService Management Detail Component', () => {
        let comp: ApplicationServiceDetailComponent;
        let fixture: ComponentFixture<ApplicationServiceDetailComponent>;
        const route = ({ data: of({ applicationService: new ApplicationService('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ApplicationServiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ApplicationServiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationServiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.applicationService).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
