import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricsComponent } from './biometrics2.component';

describe('BiometricsComponent', () => {
  let component: BiometricsComponent;
  let fixture: ComponentFixture<BiometricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
