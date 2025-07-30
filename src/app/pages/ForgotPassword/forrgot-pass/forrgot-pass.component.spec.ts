import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForrgotPassComponent } from './forrgot-pass.component';

describe('ForrgotPassComponent', () => {
  let component: ForrgotPassComponent;
  let fixture: ComponentFixture<ForrgotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForrgotPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForrgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
