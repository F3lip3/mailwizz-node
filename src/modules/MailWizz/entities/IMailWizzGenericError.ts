interface IDictionary {
  [key: string]: string;
}

export default interface IMailWizzGenericError {
  [key: string]: string | IDictionary;
}
