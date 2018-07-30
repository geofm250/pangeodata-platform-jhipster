/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { ICoverNameComponent } from 'app/entities/i-cover-name/i-cover-name.component';
import { ICoverNameService } from 'app/entities/i-cover-name/i-cover-name.service';
import { ICoverName } from 'app/shared/model/i-cover-name.model';

describe('Component Tests', () => {
    describe('ICoverName Management Component', () => {
        let comp: ICoverNameComponent;
        let fixture: ComponentFixture<ICoverNameComponent>;
        let service: ICoverNameService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [ICoverNameComponent],
                providers: []
            })
                .overrideTemplate(ICoverNameComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ICoverNameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ICoverNameService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ICoverName('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.iCoverNames[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
