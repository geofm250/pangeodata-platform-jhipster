/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { GeneralInformationUpdateComponent } from 'app/entities/general-information/general-information-update.component';
import { GeneralInformationService } from 'app/entities/general-information/general-information.service';
import { GeneralInformation } from 'app/shared/model/general-information.model';

describe('Component Tests', () => {
    describe('GeneralInformation Management Update Component', () => {
        let comp: GeneralInformationUpdateComponent;
        let fixture: ComponentFixture<GeneralInformationUpdateComponent>;
        let service: GeneralInformationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [GeneralInformationUpdateComponent]
            })
                .overrideTemplate(GeneralInformationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GeneralInformationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralInformationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GeneralInformation('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.generalInformation = entity;
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
                    const entity = new GeneralInformation();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.generalInformation = entity;
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
