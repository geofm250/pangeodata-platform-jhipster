/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { AddressCheckReportDeleteDialogComponent } from 'app/entities/address-check-report/address-check-report-delete-dialog.component';
import { AddressCheckReportService } from 'app/entities/address-check-report/address-check-report.service';

describe('Component Tests', () => {
    describe('AddressCheckReport Management Delete Component', () => {
        let comp: AddressCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<AddressCheckReportDeleteDialogComponent>;
        let service: AddressCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [AddressCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(AddressCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressCheckReportService);
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
