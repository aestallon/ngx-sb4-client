import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSb4ClientComponent } from './ngx-sb4-client.component';

describe('NgxSb4ClientComponent', () => {
  let component: NgxSb4ClientComponent;
  let fixture: ComponentFixture<NgxSb4ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSb4ClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSb4ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
