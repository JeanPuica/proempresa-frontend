import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientService } from '../services/client.service';

export const clientResolver: ResolveFn<boolean> = (route, _) => {
  return inject(ClientService).getById(Number(route.paramMap.get('id')!));
};
