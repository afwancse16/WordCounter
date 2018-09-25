import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountComponent } from './count.component';
import { StoreText, eType } from '../Model';

describe('CountComponent', () => {
  let component: CountComponent;
  let fixture: ComponentFixture<CountComponent>;
  const dummyTextdata = new StoreText();
  dummyTextdata.Inputstring = 'hello';
  dummyTextdata.OutputArray = [['hello', 1]];
  dummyTextdata.Type = eType.Text;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountComponent);
    component = fixture.componentInstance;
    component.output = dummyTextdata;
    fixture.detectChanges();
  });

  it('The number of div element should be 1 when "isfromurl" is false', () => {

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('div').length).toEqual(1);
  });

  it('The number of div element should be 2 when "isfromurl" is true', () => {
    component.isfromurl = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('div').length).toEqual(2);
  });

  it('should render the input string in the first div when "isfromurl" is true', () => {
    component.isfromurl = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div').textContent).toContain(dummyTextdata.Inputstring);
  });

  it('should render the input string in the second div as "hello : 1"', () => {

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div').textContent).toContain('hello : 1');
  });

});
