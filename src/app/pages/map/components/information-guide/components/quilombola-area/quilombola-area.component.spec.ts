import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuilombolaAreaComponent } from './quilombola-area.component';

describe('QuilombolaAreaComponent', () => {
  let component: QuilombolaAreaComponent;
  let fixture: ComponentFixture<QuilombolaAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuilombolaAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuilombolaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
