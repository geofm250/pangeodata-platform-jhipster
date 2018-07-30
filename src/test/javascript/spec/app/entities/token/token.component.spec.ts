/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { TokenComponent } from 'app/entities/token/token.component';
import { TokenService } from 'app/entities/token/token.service';
import { Token } from 'app/shared/model/token.model';

describe('Component Tests', () => {
    describe('Token Management Component', () => {
        let comp: TokenComponent;
        let fixture: ComponentFixture<TokenComponent>;
        let service: TokenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [TokenComponent],
                providers: []
            })
                .overrideTemplate(TokenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TokenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TokenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Token('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tokens[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
    });
});
