import { createHmac } from 'crypto';

interface IDictionary {
  [key: string]: any;
}

class Encrypt {
  public base64Encode(content: string): string {
    return new Buffer(content).toString('base64');
  }

  public hexEncode(key: string, content: string): string {
    return createHmac('sha1', key).update(content).digest('hex');
  }

  public ksort(obj: IDictionary): IDictionary {
    const ordered: IDictionary = {};
    Object.keys(obj)
      .sort()
      .forEach(key => {
        ordered[key] = obj[key];
      });
    return ordered;
  }

  public serialize(obj: IDictionary, prefix?: string | undefined): string {
    const str = [];
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const key = prefix ? `${prefix}[${prop}]` : prop;
        const value = obj[prop];
        str.push(
          value !== null && typeof value === 'object'
            ? this.serialize(value, key)
            : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
    return str
      .join('&')
      .replace(/%20/g, '+')
      .replace(/!/g, '%21')
      .replace(/'/, '%27');
  }
}

export default new Encrypt();
