import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// @ts-ignore
import './styles.css';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
