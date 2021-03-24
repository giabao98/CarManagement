import { MaterialCarModule } from './material-car.module';

describe('MaterialCarModule', () => {
  let materialCarModule: MaterialCarModule;

  beforeEach(() => {
    materialCarModule = new MaterialCarModule();
  });

  it('should create an instance', () => {
    expect(materialCarModule).toBeTruthy();
  });
});
