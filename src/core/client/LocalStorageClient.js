import {storage} from '@core/utils';
import {Client} from '@core/client/Client';

function storageName(param) {
  return 'excel:' + param;
}

export class LocalStorageClient extends Client {
  constructor(name) {
    super();
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(storage(this.name));
      }, 1500);
    });
  }
}
