import { Injectable } from "@angular/core";

@Injectable()
export class CommonService {
    public isOpera = false;
    public isFirefox = false;
    public isSafari = false;
    public isSafariOniPhone = false;
    public isIE = false;
    public isEdge = false;
    public isChrome = false;
    public isBlink = false;
    public browserClasses = {};

    public showLoader: boolean = false;

    constructor() {
        this.detectBrowser();
    }

    public detectBrowser() {
        /* tslint:disable */
        try {
            // Opera 8.0+
            this.isOpera = (!!window["opr"] && !!window["opr"].addons) || !!window["opera"] || navigator.userAgent.indexOf(' OPR/') >= 0;
    
           // Firefox 1.0+
           this.isFirefox = (navigator.userAgent.match(/firefox/i)) ? true : false;
    
           // Safari 3.0+ "[object HTMLElementConstructor]"
           const HTMLElementStr = "HTMLElement";
           this.isSafari = /constructor/i.test(window[HTMLElementStr]) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window["safari"] || window["safari"].pushNotification);
    
           // Internet Explorer 6-11
           this.isIE = /*@cc_on!@*/false || !!document["documentMode"];
    
           // Edge 20+
           const StyleMediaStr = "StyleMedia";
           this.isEdge = !this.isIE && !!window[StyleMediaStr];
    
           // Chrome 1+
           this.isChrome = !!window["chrome"] && !!window["chrome"].webstore;
    
           // Blink engine detection
           this.isBlink = (this.isChrome || this.isOpera) && !!window["CSS"];

           // for safari on iPhone
           try {
               this.isSafariOniPhone =  /iphone/i.test(navigator.userAgent) && /safari/i.test(navigator.userAgent);
           } catch(e) {}
           this.browserClasses = {
                "is-safari": this.isSafari,
                "is-safari-on-iphone": this.isSafariOniPhone,
                "non-iphone": !this.isSafariOniPhone,
                "isBlink": this.isBlink,
                "isChrome": this.isChrome,
                "isEdge": this.isEdge,
                "isFirefox": this.isFirefox,
                "ie": this.isIE,
                "isOpera": this.isOpera,
            };
        } catch (e) {
            this.browserClasses = {
                "is-safari": false,
                "is-safari-on-iphone": false,
                "non-iphone": false,                
                "isBlink": false,
                "isChrome": false,
                "isEdge": false,
                "isFirefox": false,
                "ie": false,
                "isOpera": false,
            };
        }
        /* tslint:enable */
   }

    public getViewPort() {
        let viewPort;
        if (screen.width < 768) {
            viewPort = "mobile";
        } else if (screen.width >= 768 && screen.width < 960) {
            viewPort = "tablet";
        } else {
            viewPort = "desktop";
        }
        return viewPort;
    }

    public getScreenSize() {
        return screen.width;
    }
}
