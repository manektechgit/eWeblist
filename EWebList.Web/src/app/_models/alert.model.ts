import { AlertType } from '../_app-constants/app-enum.config';

export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  fade: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

