import { ICompany } from "../components/Feed/interface";

export const parseCompanies = (companies: ICompany[], favorites: string[]) => {
  return partition(companies, (e) => favorites.includes(e._id));
}

function partition<T>(array: T[], isValid: (e: T) => boolean) {
  return array.reduce<[T[], T[]]>(([pass, fail], elem) => {
    return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
  }, [[], []]);
}