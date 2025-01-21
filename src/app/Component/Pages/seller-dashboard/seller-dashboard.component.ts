import { Component } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { Model } from '../../../service/model.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: false,
  
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  model: Model[] = [];
  // selectedFile: File | null = null;
  imageName: string = '';
  roleId: number = 0;
  userId: number = 0;
  imageDescription: string ='';
  price: string='';
  uploadMessage: string = '';
  quantity: number=0;

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.service.getImage().subscribe({
      next: (res) => {
        this.model = res as Model[];
        console.log(res);
        // this.model.forEach((img) => {
        //   if (img.imageData) {
        //     this.convertImageToBase64(img.imageData, img.imageId);
        //   }
        // });
      },
      error: (err) => {
        console.error('Error fetching images:', err);
      },
    });
  }
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }
  updateRecord() {
    this.service.putList(this.roleId, this.imageName,this.imageDescription,this.userId,this.price,this.quantity)
      .subscribe({
        next: res => {
          // this.model = res as Model[];
          this.router.navigate(['/sellerform']);
        },
        error: err => {
          console.log(err);
        }
      })
  }

  onDelete(imageId:number){
    if(confirm("Are you Sure")){
      this.service.deleteList(imageId)
      .subscribe({
        next: res=>{
          this.model = res as Model[];
          window.location.reload();
          alert('Deleted Successfully');
        },
        error: err=>{
          console.log(err);
        }
      })
    }

  }

}
