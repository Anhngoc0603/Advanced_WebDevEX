import { Component } from '@angular/core';
import { CoindeskAPIService } from '../../myservices/coindesk-apiservice';
import { IBitcoinPrice, ITime, IBPI } from '../myclasses/iBitcoin';

@Component({
  selector: 'app-coindesk-api',
  standalone: false,
  templateUrl: './coindesk-api.html',
  styleUrl: './coindesk-api.css',
})
export class CoindeskAPI {
  bitcoinData!: IBitcoinPrice;
  time!: ITime;
  bpi!: IBPI;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private _bitcoinService: CoindeskAPIService) {
    this._bitcoinService.getCoindeskAPI().subscribe({
      next: (data) => {
        this.bitcoinData = data;
        this.time = data.time;
        this.bpi = data.bpi;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }
}
