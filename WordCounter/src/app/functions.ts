export class Functions {

  // This method is to add all the words and its corresponding count to an object.
  public static arraytoObject(arr: any[]) {
    let obj = {};

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

  /* this method is convert the above object to an array and sort it.
  Here num is to return the number of elements from array.
  */
  public static sortedArrayfromObject(obj: any, num: number) {
    let arr = [];

    for (const item in obj) {
      arr.push([item, obj[item]]);
    }

    arr = arr.sort(function (a, b) {
      return b[1] - a[1];
    }).slice(0, num);

    return arr;
  }
}
