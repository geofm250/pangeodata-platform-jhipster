/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ICoverNameDeleteDialogComponent } from 'app/entities/i-cover-name/i-cover-name-delete-dialog.component';
import { ICoverNameService } from 'app/entities/i-cover-name/i-cover-name.service';

describe('Component Tests', () => {
    describe('ICoverName Management Delete Component', () => {
        let comp: ICoverNameDeleteDialogComponent;
        let fixture: ComponentFixture<ICoverNameDeleteDialogComponent>;
        let service: ICoverNameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ICoverNameDeleteDialogComponent]
            })
                .overrideTemplate(ICoverNameDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ICoverNameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ICoverNameService);
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
