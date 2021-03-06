/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { RuleUpdateComponent } from 'app/entities/rule/rule-update.component';
import { RuleService } from 'app/entities/rule/rule.service';
import { Rule } from 'app/shared/model/rule.model';

describe('Component Tests', () => {
    describe('Rule Management Update Component', () => {
        let comp: RuleUpdateComponent;
        let fixture: ComponentFixture<RuleUpdateComponent>;
        let service: RuleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [RuleUpdateComponent]
            })
                .overrideTemplate(RuleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RuleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RuleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Rule('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rule = entity;
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
                    const entity = new Rule();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rule = entity;
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
