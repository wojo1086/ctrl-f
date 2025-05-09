import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        RouterLink
    ],
    styleUrl: './app.component.sass'
})
export class AppComponent {

}
