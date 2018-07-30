/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PangeodataJHipsterTestModule } from '../../../test.module';
import { TokenDetailComponent } from 'app/entities/token/token-detail.component';
import { Token } from 'app/shared/model/token.model';

describe('Component Tests', () => {
    describe('Token Management Detail Component', () => {
        let comp: TokenDetailComponent;
        let fixture: ComponentFixture<TokenDetailComponent>;
        const route = ({ data: of({ token: new Token('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PangeodataJHipsterTestModule],
                declarations: [TokenDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TokenDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TokenDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.token).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
