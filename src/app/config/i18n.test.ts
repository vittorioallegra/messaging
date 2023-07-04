import { i18n } from './i18n';
import { mockTranslationsEn, mockTranslationsIt } from './mocks';

describe('i18n', () => {
  beforeAll(() => {
    i18n.addResources('en', 'translation', mockTranslationsEn);
    i18n.addResources('it', 'translation', mockTranslationsIt);
  });

  it('language', () => {
    expect(i18n.language).toEqual('en');
  });

  it('fallback', () => {
    expect(i18n.t('not_existent')).toEqual('not_existent');
  });

  it('addResources', () => {
    expect(i18n.t('language')).toEqual(mockTranslationsEn.language);
    expect(i18n.t('onlyEnglish')).toEqual(mockTranslationsEn.onlyEnglish);
    expect(i18n.t('onlyItalian')).toEqual(mockTranslationsIt.onlyItalian);
  });

  it('changeLanguage', () => {
    expect(i18n.t('language')).toEqual(mockTranslationsEn.language);

    i18n.changeLanguage('it');

    expect(i18n.t('language')).toEqual(mockTranslationsIt.language);
  });
});
