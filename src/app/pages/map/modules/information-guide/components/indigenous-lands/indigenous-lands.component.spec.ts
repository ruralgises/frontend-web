import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndigenousLandsComponent } from './indigenous-lands.component';

describe('IndigenousLandsComponent', () => {
  let component: IndigenousLandsComponent;
  let fixture: ComponentFixture<IndigenousLandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndigenousLandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndigenousLandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
