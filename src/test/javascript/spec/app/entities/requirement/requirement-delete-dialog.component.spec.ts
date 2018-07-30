/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { RequirementDeleteDialogComponent } from 'app/entities/requirement/requirement-delete-dialog.component';
import { RequirementService } from 'app/entities/requirement/requirement.service';

describe('Component Tests', () => {
    describe('Requirement Management Delete Component', () => {
        let comp: RequirementDeleteDialogComponent;
        let fixture: ComponentFixture<RequirementDeleteDialogComponent>;
        let service: RequirementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [RequirementDeleteDialogComponent]
            })
                .overrideTemplate(RequirementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequirementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
