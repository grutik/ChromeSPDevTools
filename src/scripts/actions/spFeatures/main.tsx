import * as React from "react";
import * as ReactDOM from "react-dom";
import SpCustomModalWrapper from './../common/components/spCustomModalWrapper';
import { AppBase } from './../common/AppBase';
import SpFeatures from './SpFeatures';
import Utils from './../common/utils';

class App extends AppBase {
    constructor() {
        super('spPropBaseDiv')
    }
    public show(showOnlyIconsInButtons: boolean) {
        let that = this;
        Utils.ensureSPObject().then(() => {
            ReactDOM.render(<SpCustomModalWrapper onCloseClick={that.remove.bind(this)} modalDialogTitle="Web/Site Features" modalWidth="800px">
                <SpFeatures showOnlyIconsInButtons={showOnlyIconsInButtons} closeWindowFunction={that.remove.bind(this)} />
            </SpCustomModalWrapper>, document.getElementById(that.baseDivId));
        });
    }
}

window.SpPropertyBagObj = new App();
window.SpPropertyBagObj.show(true);