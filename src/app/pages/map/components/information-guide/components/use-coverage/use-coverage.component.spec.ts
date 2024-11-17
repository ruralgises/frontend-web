import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCoverageComponent } from './use-coverage.component';

describe('UseCoverageComponent', () => {
  let component: UseCoverageComponent;
  let fixture: ComponentFixture<UseCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseCoverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
