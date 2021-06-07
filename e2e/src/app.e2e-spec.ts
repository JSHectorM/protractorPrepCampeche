import { browser, element, by, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { async } from 'rxjs';
import { AppPage } from './app.po';


const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function stop() {
  const args = arguments;

  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(90);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
describe('PREP CAMPECHE', () => {

  let API : AppPage;

  const EC = browser.ExpectedConditions;


    async function login(url) {
    browser.driver.manage().window().maximize();
    await browser.get(url);
    await browser.waitForAngularEnabled(false);
  }



  // ? https://difusores.prep2021-cam.mx/assets/entregables/68/22/20210607_0020_PREP_CAMP.zip
  //*  https://difusores.prep2021-cam.mx/assets/entregables/68/24/20210607_0100_PREP_CAMP.zip

  async function armarURL( ) {
    let base = "https://difusores.prep2021-cam.mx/assets/entregables/68/";
    let version = 26;
    let fecha = "/20210607_";
    let hora = "????";
    let final = "_PREP_CAMP.zip"

    let url = base+version+fecha+hora+final;
    let minutos = [ 0,20,40,45];
    let minutosData = [ "00","20","40","45"];
    let horas = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    let horasData = [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];

    let ultimoEnv:string = "";

    // console.log(url);


    let datoHora :Date = new Date;

    console.log(datoHora.getHours());
    console.log(datoHora.getMinutes());

    for (let i = 0; i < minutos.length; i++) {
      if(datoHora.getMinutes() == minutos[i]){
        for (let j = 0; j < horas.length; j++) {
          if (datoHora.getHours() == horas[j]) {

            if (ultimoEnv != minutosData[i]) {

              ultimoEnv = minutosData[i];
              
              hora = horasData[j]+minutosData[i];
  
              console.log(hora);
              
  
              url = base+version+fecha+hora+final;
  
              console.log(url);
              
              version++;
              API.enviarURLprp(url);
  
              // console.log(url);
              // console.log(version);
  
              
            }

          }
          
        }

      }
    }

    
    
  }

  it('Monitore BD', async (params) => {

    let pagIni = 'http://www.prepcampeche.org.mx/'
    let pagBd = 'http://www.prepcampeche.org.mx/base-de-datos'

    let url = "https://difusores.prep2021-cam.mx/assets/entregables/68/27/20210607_0200_PREP_CAMP.zip";

    await login(pagIni);
    await browser.waitForAngularEnabled(false);

    await element.all(by.css('.font-light')).first().click();
    await login(pagBd);

    // await armarURL();

    // await setInterval(armarURL, 5000);

    await API.enviarURLprp(url);
   
  });
});