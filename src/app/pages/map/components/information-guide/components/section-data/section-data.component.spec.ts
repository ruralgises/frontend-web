import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDataComponent } from './section-data.component';

describe('SectionDataComponent', () => {
  let component: SectionDataComponent;
  let fixture: ComponentFixture<SectionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
