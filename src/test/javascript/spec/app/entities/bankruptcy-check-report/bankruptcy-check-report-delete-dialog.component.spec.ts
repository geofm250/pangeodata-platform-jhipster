/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { BankruptcyCheckReportDeleteDialogComponent } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report-delete-dialog.component';
import { BankruptcyCheckReportService } from 'app/entities/bankruptcy-check-report/bankruptcy-check-report.service';

describe('Component Tests', () => {
    describe('BankruptcyCheckReport Management Delete Component', () => {
        let comp: BankruptcyCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<BankruptcyCheckReportDeleteDialogComponent>;
        let service: BankruptcyCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [BankruptcyCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(BankruptcyCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BankruptcyCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankruptcyCheckReportService);
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
