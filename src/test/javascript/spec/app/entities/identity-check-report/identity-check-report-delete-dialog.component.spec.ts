/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { IdentityCheckReportDeleteDialogComponent } from 'app/entities/identity-check-report/identity-check-report-delete-dialog.component';
import { IdentityCheckReportService } from 'app/entities/identity-check-report/identity-check-report.service';

describe('Component Tests', () => {
    describe('IdentityCheckReport Management Delete Component', () => {
        let comp: IdentityCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<IdentityCheckReportDeleteDialogComponent>;
        let service: IdentityCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [IdentityCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(IdentityCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IdentityCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdentityCheckReportService);
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
