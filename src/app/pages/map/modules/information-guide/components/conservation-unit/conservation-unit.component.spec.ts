import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConservationUnitComponent } from './conservation-unit.component';

describe('ConservationUnitComponent', () => {
  let component: ConservationUnitComponent;
  let fixture: ComponentFixture<ConservationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConservationUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConservationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
