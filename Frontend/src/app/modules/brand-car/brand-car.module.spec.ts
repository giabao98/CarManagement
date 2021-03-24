import { BrandCarModule } from './brand-car.module';

describe('BrandCarModule', () => {
  let brandCarModule: BrandCarModule;

  beforeEach(() => {
    brandCarModule = new BrandCarModule();
  });

  it('should create an instance', () => {
    expect(brandCarModule).toBeTruthy();
  });
});
