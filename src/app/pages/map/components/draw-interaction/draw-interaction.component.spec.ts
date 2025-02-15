import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawInteractionComponent } from './draw-interaction.component';

describe('DrawInteractionComponent', () => {
  let component: DrawInteractionComponent;
  let fixture: ComponentFixture<DrawInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawInteractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
