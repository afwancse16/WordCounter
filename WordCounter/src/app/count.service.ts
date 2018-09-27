import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StoreText, eType } from './Model';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  private outputarray: StoreText[] = [];

  constructor(private http: HttpClient) { }

  public getTextFromUrl(url: string): Observable<string> {
    return this.http.get<string>(url).pipe(
      map((data: any) => data.text_out)
    );
  }

  public getOutputArray = (type: eType) => this.outputarray.filter(i => i.Type === type);

  public validateInputandreturnarray(inputstr: string) {
    // checking whether the input string is undefined or not.
    if (inputstr) {
      /*
          Below I am first replacing all the new line character from string and then all the special character.
          After that I am trimming the extra space.
      */
      const str = inputstr.replace(/\n/g, ' ').replace(/[^\w\s]/gi, '').trim();
      let arr = [];
      if (str.length) {
        // convert the input string to array.
        arr = str.split(' ');

        return arr;
      } else {
        return [];
      }
    }
  }

  private arraytoObject(arr: any[]) {
    const obj = {};

    arr.forEach((element: string) => {
      if (element.trim().length) {
        if (obj[element.toLowerCase()]) {
          obj[element.toLowerCase()] = obj[element.toLowerCase()] + 1;
        } else {
          obj[element.toLowerCase()] = 1;
        }
      }
    });

    return obj;
  }

  public sortedArrayfromObject(arr: any[], num: number, Type: eType, inputstr: string, Url: string = null) {
    const obj = this.arraytoObject(arr);
    let newarr = [];

    for (const item in obj) {
      newarr.push([item, obj[item]]);
    }

    newarr = newarr.sort(function (a, b) {
      return b[1] - a[1];
    }).slice(0, num);

    this.outputarray = this.outputarray.length ? this.outputarray.filter(i => i.Type !== Type) : [];

    const storetext = this.generateStoreText(Url, Type, newarr, inputstr);

    this.outputarray.push(storetext);
  }

  private generateStoreText(Url: string, Type: eType, newarr: any[], inputstr: string) {
    const storetext = new StoreText();
    storetext.Url = Url;
    storetext.Type = Type;
    storetext.OutputArray = newarr;
    storetext.Inputstring = inputstr;
    return storetext;
  }
}
