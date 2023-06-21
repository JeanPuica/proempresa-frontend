import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'client-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  private obs$ = new Subscription();

  clientForm: FormGroup;
  client: any;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      documento: [null, Validators.required],
      email: [null, Validators.email],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      if (client && client.id) {
        this.client = client;
        this.setData();
      }
    });
  }

  submit() {
    if (this.clientForm.invalid) return;

    const formData = this.clientForm.getRawValue();

    if (this.client) {
      this.updateClient(this.client.id, formData);
    } else {
      this.createClient(formData);
    }
  }

  createClient(data: any) {
    this.obs$ = this.clientService.create(data).subscribe({
      next: () => {
        Swal.fire('Guardado!', '', 'success').then(() => this.router.navigate(["/"]));
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: err,
      })
    });
  }

  updateClient(id: number, data: any) {
    this.obs$ = this.clientService.update(id, data).subscribe({
      next: () => {
        Swal.fire('Actualizado con exito!', '', 'success').then(() => this.router.navigate(["/"]));
      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: err,
      })
    });
  }

  setData() {
    this.clientForm.get('nombres')?.setValue(this.client.nombres);
    this.clientForm.get('apellidos')?.setValue(this.client.apellidos);
    this.clientForm.get('documento')?.setValue(this.client.documento);
    this.clientForm.get('email')?.setValue(this.client.email);
  }

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
