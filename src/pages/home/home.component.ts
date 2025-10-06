import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `<div
    class="flex flex-col gap-2 max-w-96 mx-auto text-center mt-10"
  >
    <h1 class="text-2xl font-semibold">Olá, e bem vindo ao "Orders App".</h1>
    <h2>
      Isso é um webapp criado com Angular 19 e NestJs 10 como parte do desafio
      técnico da Zoppy.
    </h2>
  </div>`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
