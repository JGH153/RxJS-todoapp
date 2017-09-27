import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFishFinderComponent } from './todo-fish-finder.component';

describe('TodoFishFinderComponent', () => {
  let component: TodoFishFinderComponent;
  let fixture: ComponentFixture<TodoFishFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFishFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFishFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
