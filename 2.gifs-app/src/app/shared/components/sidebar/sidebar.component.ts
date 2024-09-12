import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifsService:GifsService){
  }

  // Obtenemos la lista tags (busquedas del usuario) 
  get tags(){ 
    return this.gifsService.getTagsHistory();
  }

  // 
  searchTag(newTag:string){
    this.gifsService.searchTag(newTag);
  }

}
