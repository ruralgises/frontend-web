import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationGuideComponent } from './information-guide.component';

describe('InformationGuideComponent', () => {
  let component: InformationGuideComponent;
  let fixture: ComponentFixture<InformationGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
