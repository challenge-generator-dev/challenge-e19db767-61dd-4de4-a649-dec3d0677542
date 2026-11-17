// TODO(reto): archivo stubbeado; implementa los cuerpos.
export class UpdateOrderStateDto {
  state: string;

  constructor(state: string) {
    this.state = state;
  }

  static fromRequest(state: string): UpdateOrderStateDto {
    throw new Error('TODO(reto): fromRequest');
  }
}