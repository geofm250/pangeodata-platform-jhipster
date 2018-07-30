/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ReportedCriminalActivityCheckDeleteDialogComponent } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check-delete-dialog.component';
import { ReportedCriminalActivityCheckService } from 'app/entities/reported-criminal-activity-check/reported-criminal-activity-check.service';

describe('Component Tests', () => {
    describe('ReportedCriminalActivityCheck Management Delete Component', () => {
        let comp: ReportedCriminalActivityCheckDeleteDialogComponent;
        let fixture: ComponentFixture<ReportedCriminalActivityCheckDeleteDialogComponent>;
        let service: ReportedCriminalActivityCheckService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ReportedCriminalActivityCheckDeleteDialogComponent]
            })
                .overrideTemplate(ReportedCriminalActivityCheckDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReportedCriminalActivityCheckDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportedCriminalActivityCheckService);
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
