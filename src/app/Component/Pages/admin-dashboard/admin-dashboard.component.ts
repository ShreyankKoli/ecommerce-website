import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { Model } from '../../../service/model.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  public dataSource: any = [];
  public displayedColumns: string[] = ["imageId", "userId", "roleId", "imageName", "imageDescription", "price", "imageData","Action","quantity"];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public service: ServiceService) { }

  ngOnInit(): void {
    this.service.getImage()
      .subscribe({
        next: res => {
          this.service.list = res as Model[];
          this.dataSource = new MatTableDataSource<Model>(this.service.list);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res);
        },
        error: err => {
          console.error(err);
        }
      })
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;

  }

  onEdit() { }

  onDelete(id:number){
    if(confirm("Are you sure")){
      this.service.deleteList(id)
      .subscribe({
        next: res=>{
          this.service.list = res as Model[];
          window.location.reload();
          alert("Data deleted successfully");
        },
        error: err=>{
          console.log(err);
        }
      })
    }
   }

}
