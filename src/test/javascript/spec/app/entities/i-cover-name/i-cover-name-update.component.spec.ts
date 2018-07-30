/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ICoverNameUpdateComponent } from 'app/entities/i-cover-name/i-cover-name-update.component';
import { ICoverNameService } from 'app/entities/i-cover-name/i-cover-name.service';
import { ICoverName } from 'app/shared/model/i-cover-name.model';

describe('Component Tests', () => {
    describe('ICoverName Management Update Component', () => {
        let comp: ICoverNameUpdateComponent;
        let fixture: ComponentFixture<ICoverNameUpdateComponent>;
        let service: ICoverNameService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ICoverNameUpdateComponent]
            })
                .overrideTemplate(ICoverNameUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ICoverNameUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ICoverNameService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ICoverName('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iCoverName = entity;
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
                    const entity = new ICoverName();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.iCoverName = entity;
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
