/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { GeneralInformationDeleteDialogComponent } from 'app/entities/general-information/general-information-delete-dialog.component';
import { GeneralInformationService } from 'app/entities/general-information/general-information.service';

describe('Component Tests', () => {
    describe('GeneralInformation Management Delete Component', () => {
        let comp: GeneralInformationDeleteDialogComponent;
        let fixture: ComponentFixture<GeneralInformationDeleteDialogComponent>;
        let service: GeneralInformationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [GeneralInformationDeleteDialogComponent]
            })
                .overrideTemplate(GeneralInformationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GeneralInformationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GeneralInformationService);
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
