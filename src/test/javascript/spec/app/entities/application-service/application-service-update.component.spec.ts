/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ApplicationServiceUpdateComponent } from 'app/entities/application-service/application-service-update.component';
import { ApplicationServiceService } from 'app/entities/application-service/application-service.service';
import { ApplicationService } from 'app/shared/model/application-service.model';

describe('Component Tests', () => {
    describe('ApplicationService Management Update Component', () => {
        let comp: ApplicationServiceUpdateComponent;
        let fixture: ComponentFixture<ApplicationServiceUpdateComponent>;
        let service: ApplicationServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ApplicationServiceUpdateComponent]
            })
                .overrideTemplate(ApplicationServiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationServiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationServiceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ApplicationService('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationService = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ApplicationService();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationService = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
