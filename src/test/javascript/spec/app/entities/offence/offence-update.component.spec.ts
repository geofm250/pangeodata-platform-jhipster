/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { OffenceUpdateComponent } from 'app/entities/offence/offence-update.component';
import { OffenceService } from 'app/entities/offence/offence.service';
import { Offence } from 'app/shared/model/offence.model';

describe('Component Tests', () => {
    describe('Offence Management Update Component', () => {
        let comp: OffenceUpdateComponent;
        let fixture: ComponentFixture<OffenceUpdateComponent>;
        let service: OffenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [OffenceUpdateComponent]
            })
                .overrideTemplate(OffenceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OffenceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffenceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Offence('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.offence = entity;
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
                    const entity = new Offence();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.offence = entity;
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
