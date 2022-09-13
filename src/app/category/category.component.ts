import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, from, Observable, of, toArray } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private http: HttpService) { }
  dishList$: Observable<any[]>;
  dishQTY: number=0;

  ngOnInit(): void {
    this.returnCategory();
    this.returnDush();
  };

  returnCategory(): string | null {
    const category = this.route.snapshot.paramMap.get('category')
    return category
  };

  returnDush() {
    this.dishList$ = this.http.getDishList();
    this.dishList$.subscribe((res) => {
      from(res).pipe(
        filter((x => x.category === this.returnCategory())),
        toArray()
      ).subscribe((res) => {
        this.dishList$ = of(res)
      })
    })
  };

  incriceDish() {
    this.dishQTY += 1
    this.http.cartChanges.next(this.dishQTY)

  }
  decriceDish() {
    this.dishQTY -= 1
    this.http.cartChanges.next(this.dishQTY)

  }
};


