import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

const URL = 'http://localhost:3000/remoteEntry.js';

export const APP_ROUTES: Routes = [
    {
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    },

    {
      path: 'flights-lazy',
      loadChildren: () => import('projects/mfe1/src/app/flights/flights.module.lazy').then(m => m.FlightsLazyModule)
    },

    {
      path: 'flights',
      loadChildren: () => loadRemoteModule({
          remoteEntry: URL,
          remoteName: 'mfe1',
          exposedModule: './Module'
        })
        .then(m => m.FlightsModule) 
    },

    {
      path: '**',
      component: NotFoundComponent
    }

    // DO NOT insert routes after this one.
    // { path:'**', ...} needs to be the LAST one.

];

