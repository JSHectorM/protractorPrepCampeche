import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { async } from 'rxjs';

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function stop() {
  const args = arguments;

  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(90);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
describe('PREP CAMPECHE', () => {

  const EC = browser.ExpectedConditions;

  async function login(url) {
    browser.driver.manage().window().maximize();
    await browser.get(url);
    await browser.waitForAngularEnabled(false);
  }

  it('Monitore BD', async (params) => {

    let pagIni = 'http://www.prepcampeche.org.mx/'
    let pagBd = 'http://www.prepcampeche.org.mx/base-de-datos'
    let download ='chrome://downloads/';
    let urlA : ElementFinder;
    let url;

    await login(pagIni);
    await browser.waitForAngularEnabled(false);

    await element.all(by.css('.font-light')).first().click();
    await login(pagBd);



    async function consultarBD() {
      let btnBD = element.all(by.css('.btn-blanco')).first();
      await btnBD.click();
      while(true){
        let url =  await browser.getCurrentUrl();
        if(url == 'https://difusores.prep2021-cam.mx/assets/entregables/55/1/20210601_1852_PREP_CAMP.zip'){
          console.log(url);
        }
      }
      

      // console.log( await element(by.cssContainingText("button","Base de datos ")).getAttribute('class'));
      
      
      
      
      
    //   await btnBD.click().then(async (res) => {
        
    //     await login(download);
    //     //* <a id="url" target="_blank" focus-row-control="" focus-type="url" href="https://difusores.prep2021-cam.mx/assets/entregables/55/1/20210601_1852_PREP_CAMP.zip" tabindex="0">https://difusores.prep2021-cam.mx/assets/entregables/55/1/20210601_1852_PREP_CAMP.zip</a>
    //     console.log('1');

    //    await browser.sleep(5000);

    //    console.log('2');
    //     url = await element(by.id('url')).getAttribute('href');
    //     console.log('3');
    //     // await browser.sleep(3000);
    //     console.log(url);

    //     // urlA.getText().then(resp => {
    //     //   console.log(resp);
    //     //   url = resp;
    //     // }).catch(resp => {
    //     //   console.log(resp);
    //     // });

    //   });
    }

    await consultarBD();

    await setInterval(consultarBD, 30000);
   
  });
});