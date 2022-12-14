import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations:[fade]
})
export class MenuComponent implements OnInit {

  menuList$: Observable<Menu[]>
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.returnMenuList()
  }

  returnMenuList(){
    this.menuList$=this.http.getMenu();
  };

}
