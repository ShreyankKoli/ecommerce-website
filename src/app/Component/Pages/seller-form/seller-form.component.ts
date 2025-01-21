import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { URL } from 'url';
import { environment } from '../../../../environments/environment';
import { Model } from '../../../service/model.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-form',
  standalone: false,

  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.css'
})
export class SellerFormComponent implements OnInit {
  // base64: any;
  // model: any;
  // base64Images: any;
  // formData = {ImageData:null}

  constructor(public service: ServiceService) { }

  selectedFile: File | null = null;
  imageName: string = '';
  roleId: number = 0;
  userId: number = 0;
  imageDescription: string ='';
  price: string='';
  uploadMessage: string = '';
  quantity: number = 0;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (!this.selectedFile || !this.imageName || !this.imageDescription || !this.price || this.roleId || this.quantity <= 0) {
      this.uploadMessage = 'Please fill all the fields and select a file.';
      return;
    }

    this.service
      .uploadImage(this.selectedFile, this.roleId, this.imageName,this.imageDescription,this.userId,this.price,this.quantity)
      .subscribe(
        (response) => {
          this.uploadMessage = 'Image uploaded successfully.';
          console.log(response);
        },
        (error) => {
          this.uploadMessage = 'Error uploading image.';
          console.error(error);
        }
      );
  }

  // onSubmit(form:NgForm){
  //   this.service.postImage()
  //   .subscribe({
  //     next: res=>{
  //       this.service.list = res as Model[];
  //     },
  //     error: err=>{
  //       console.error(err);
  //     }
  //   })
  // }

  // onFileSelected(event: any) {
  //      const file = event.target.files[0];
  //      if (file) {
  //        const reader = new FileReader();
  //        reader.onload = () => {
  //         if(this.service && this.service.formData){
  //          this.service.formData.imageData = reader.result as string;
  //        };
  //       }
  //        reader.readAsDataURL(file);
  //      }
  //    }



  ngOnInit(): void {
  //   this.service.getImage()
  //     .subscribe({
  //       next: res => {
  //         this.service.list = res as Model[];
  //         console.log(res);
  //         this.service.list.forEach((img) => {
  //           this.convertToBase64(img.imageData, img.imageId);
  //         });
  //       },
  //       error: err => {
  //         console.error(err);
  //       }
  //     })
  // }

  // convertToBase64(imageData: any, imageId: number): void {
  //   const byteArray = new Uint8Array(imageData);
  //   console.log(byteArray);
  //   const binaryString = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
  //   const base64String = btoa(binaryString);
  //   this.base64Images[imageId] = `data:image/png;base64,${base64String}`;
  }
 }
  



