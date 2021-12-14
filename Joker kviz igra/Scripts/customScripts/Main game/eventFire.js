var evObj = document.createEvent('Events');

function eventFire(el, etype) {             // ZA TRIGER KLIKA NA ELEMENT
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}