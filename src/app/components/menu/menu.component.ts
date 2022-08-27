import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { HttpService } from 'src/app/services/http.service';
import { MenuModule } from './menu.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuList$: Observable<Menu[]>
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.returnMenuList()
  }

  returnMenuList(){
    this.menuList$=this.http.getMenu();
    this.menuList$.subscribe((res)=>{
      this.menuList$=of(res)
      
    })
    
  };

}
