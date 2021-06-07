import { browser, by, element } from 'protractor';
import fetch from 'cross-fetch';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  enviarURLprp(hash:string): Promise<Response> {
    let resp = fetch('https://telesur-inedata.herokuapp.com/subirVotos', {
      method: 'PUT',
      body: JSON.stringify({
        "Url": hash,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    return resp as Promise<Response>;
  }
}
