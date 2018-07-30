/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { CivilLitigationCheckReportDeleteDialogComponent } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report-delete-dialog.component';
import { CivilLitigationCheckReportService } from 'app/entities/civil-litigation-check-report/civil-litigation-check-report.service';

describe('Component Tests', () => {
    describe('CivilLitigationCheckReport Management Delete Component', () => {
        let comp: CivilLitigationCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<CivilLitigationCheckReportDeleteDialogComponent>;
        let service: CivilLitigationCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [CivilLitigationCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(CivilLitigationCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CivilLitigationCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CivilLitigationCheckReportService);
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
