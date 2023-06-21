import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private obs$ = new Subscription();
  clients: any[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  deleteClient(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Estas seguro?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.obs$ = this.clientService.delete(id).subscribe({
          next: () => {
            this.getClients();
            Swal.fire('Eliminado!', '', 'success');
          },
          error: (err) => Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: err,
          })
        });
      }
    })
  }

  getClients() {
    this.obs$ = this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: err,
      }),
    });
  }

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
  }
}
