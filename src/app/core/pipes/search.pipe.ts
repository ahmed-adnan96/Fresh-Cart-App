import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] , term:string): Product[] {
    return products.filter((prod)=> prod.title.toLowerCase().includes(term.toLowerCase()))
  }

}
