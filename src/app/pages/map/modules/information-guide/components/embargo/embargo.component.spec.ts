import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbargoComponent } from './embargo.component';

describe('EmbargoComponent', () => {
  let component: EmbargoComponent;
  let fixture: ComponentFixture<EmbargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbargoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
