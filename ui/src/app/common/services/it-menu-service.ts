import { Injectable } from "@angular/core";

@Injectable()
export class ITMenuService {

    // required for assuring menu doesn't go out of screen
    public onMenuOpen(trigger: any, setWidthAsPerTrigger: boolean = false) {
        let paneEl;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // overlayRef is included in trigger only if x/yPosition mentioned
        // else containerElement needs to be used
        if (trigger._overlayRef) {
            paneEl = trigger._overlayRef.overlayElement;
        } else {
            const contEl = trigger._overlay._overlayContainer._containerElement;
            paneEl = contEl.getElementsByClassName("cdk-overlay-pane")[0];
        }

        if (setWidthAsPerTrigger) {
            paneEl.style.width = trigger._element.nativeElement.clientWidth + "px";
        }
        const curLeft = Number.parseFloat(paneEl.style.left);
        const curMenuWidth = paneEl.clientWidth;
        let curDiff = (curLeft + curMenuWidth) - winWidth;
        if (curDiff > 0) {
            const newLeft = curLeft - curDiff;
            paneEl.style.left = newLeft + "px";
        }

        const curTop = Number.parseFloat(paneEl.style.top);
        const curMenuHeight = paneEl.clientHeight;
        curDiff = (curTop + curMenuHeight) - winHeight;
        if (curDiff > 0) {
            const newTop = curTop - curDiff;
            paneEl.style.top = newTop + "px";
        }
    }

    public onMultiSelectPanelOpen(trigger: any, triggerParent: any) {
        let paneEl;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // overlayRef is included in trigger only if x/yPosition mentioned
        // else containerElement needs to be used
        if (trigger._overlayRef) {
            paneEl = trigger._overlayRef.overlayElement;
        } else {
            const contEl = trigger._overlay._overlayContainer._containerElement;
            paneEl = contEl.getElementsByClassName("cdk-overlay-pane")[0];
        }

        // if (setWidthAsPerTrigger) {
        //     paneEl.style.width = trigger._element.nativeElement.clientWidth + "px";
        // }
        paneEl.style.width = triggerParent.clientWidth + "px";
        const parentLeft = this.getPosition(triggerParent);
        paneEl.style.left = parentLeft.x + "px";
        const curLeft = Number.parseFloat(paneEl.style.left);
        const curMenuWidth = paneEl.clientWidth;
        let curDiff = (curLeft + curMenuWidth) - winWidth;
        if (curDiff > 0) {
            const newLeft = curLeft - curDiff;
            paneEl.style.left = newLeft + "px";
        }

        const curTop = Number.parseFloat(paneEl.style.top) + 4;
        paneEl.style.top = curTop + "px";
        const curMenuHeight = paneEl.clientHeight;
        curDiff = (curTop + curMenuHeight) - winHeight;
        if (curDiff > 0) {
            const newTop = curTop - curDiff;
            paneEl.style.top = newTop + "px";
        }
    }

    public getPosition(el) {
        let xPos = 0;
        let yPos = 0;

        while (el) {
          if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            const yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
          } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
          }

          el = el.offsetParent;
        }
        return {
          x: xPos,
          y: yPos,
        };
    }

}
