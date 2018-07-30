/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { EmploymentReportDeleteDialogComponent } from 'app/entities/employment-report/employment-report-delete-dialog.component';
import { EmploymentReportService } from 'app/entities/employment-report/employment-report.service';

describe('Component Tests', () => {
    describe('EmploymentReport Management Delete Component', () => {
        let comp: EmploymentReportDeleteDialogComponent;
        let fixture: ComponentFixture<EmploymentReportDeleteDialogComponent>;
        let service: EmploymentReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [EmploymentReportDeleteDialogComponent]
            })
                .overrideTemplate(EmploymentReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmploymentReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmploymentReportService);
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
