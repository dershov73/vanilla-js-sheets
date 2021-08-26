export class Client {
  save(state) {
    throw new Error(
        'Method "save" with "state" as param should be implemented'
    );
  }

  get() {
    throw new Error('Method "get" should be implemented');
  }
}
