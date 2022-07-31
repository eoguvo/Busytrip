import { atom } from 'recoil';

interface EffectProp {
  setSelf: (value: string) => void, 
  onSet: (
    cb: (newValue: string, _: any, isReset: boolean) => void
  ) => void
}

const localStorageEffect = (key: string) => ({setSelf, onSet}: EffectProp) => {
  const savedValue = localStorage.getItem(key) || ''
  if (!!savedValue) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

const authAtom = atom({
  key: 'auth',
  default: '',
  effects: [
    localStorageEffect('auth'),
  ]
});

export { authAtom };