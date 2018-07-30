/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { LicenseCheckReportDeleteDialogComponent } from 'app/entities/license-check-report/license-check-report-delete-dialog.component';
import { LicenseCheckReportService } from 'app/entities/license-check-report/license-check-report.service';

describe('Component Tests', () => {
    describe('LicenseCheckReport Management Delete Component', () => {
        let comp: LicenseCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<LicenseCheckReportDeleteDialogComponent>;
        let service: LicenseCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [LicenseCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(LicenseCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LicenseCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicenseCheckReportService);
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
