import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FirebaseModule } from 'src/app/core/firebase.module';
import { MaterialModule } from 'src/app/core/material.module';

@NgModule({
	exports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		FirebaseModule,
		MaterialModule,
	],
})
export class CoreModule { }
