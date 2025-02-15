import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interface/product';
import { Category } from 'src/app/core/interface/cartdetails';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  categorySpecific: string | null = '';
  categoryDetails: Category = {} as Category;
  filterName: string[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categorySpecific = params.get('id');
      },
    });
    this._ProductsService.getSpecificCategory(this.categorySpecific).subscribe({
      next: (res) => {
        this.categoryDetails = res.data;
      },
      error: (err) => {
        console.log('specfic', err);
      },
    });
    this._ProductsService
      .getSpecificSubCategory(this.categorySpecific)
      .subscribe({
        next: (res) => {
          let subCat: any[] = res.data;

          this.filterName = subCat.map((x) => x.name);
        },
        error: (err) => {
          console.log('specficsub', err);
        },
      });
  }
}
