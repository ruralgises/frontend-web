import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecriptionInformationComponent } from './decription-information.component';

describe('DecriptionInformationComponent', () => {
  let component: DecriptionInformationComponent;
  let fixture: ComponentFixture<DecriptionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecriptionInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecriptionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
