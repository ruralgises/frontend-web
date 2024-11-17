import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengendComponent } from './lengend.component';

describe('LengendComponent', () => {
  let component: LengendComponent;
  let fixture: ComponentFixture<LengendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LengendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LengendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
