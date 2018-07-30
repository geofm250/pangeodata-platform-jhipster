/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { SocialMediaCheckReportDeleteDialogComponent } from 'app/entities/social-media-check-report/social-media-check-report-delete-dialog.component';
import { SocialMediaCheckReportService } from 'app/entities/social-media-check-report/social-media-check-report.service';

describe('Component Tests', () => {
    describe('SocialMediaCheckReport Management Delete Component', () => {
        let comp: SocialMediaCheckReportDeleteDialogComponent;
        let fixture: ComponentFixture<SocialMediaCheckReportDeleteDialogComponent>;
        let service: SocialMediaCheckReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [SocialMediaCheckReportDeleteDialogComponent]
            })
                .overrideTemplate(SocialMediaCheckReportDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SocialMediaCheckReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialMediaCheckReportService);
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
