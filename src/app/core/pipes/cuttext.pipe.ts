import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true
})
export class CuttextPipe implements PipeTransform {

  transform(text : string , count : number): string {
    return text.split(" ").slice(0 , count).join(" ");
  }

}
