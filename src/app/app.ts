
import { Component } from '@angular/core';
import { Shop } from './components/shop/shop';

@Component({
  selector: 'app-root',
  imports: [Shop],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
