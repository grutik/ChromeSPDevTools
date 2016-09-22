/// <reference path="../../../typings/index.d.ts"/>

import * as React from 'react';
import ActionItem from './ActionItem'

interface IActionData {
    title: string,
    descriptio: string,
    image: string,
    scriptUrl: string
};

interface PopUpProps {

}
interface PopUpState {
    actions: IActionData[]
}

export default class PopUp extends React.Component<PopUpProps, PopUpState> {
    constructor() {
        super();
        this.state = {
            actions: []
        };
    }
    public getActions() {
        let that: any = this;
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data/actions.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status === 200) {
                var data = JSON.parse(xobj.responseText);
                that.setState({ actions: data });
            }
        };
        xobj.send(null);

    }
    private componentDidMount() {
        this.getActions();
    }
    public render() {


        let opts: any = this.state.actions.map((opt: any, index: number) => {
            return (<ActionItem item={opt} key={index} />);
        });
        return <div className="container">
            <div className="page-header">
                <h3>Chrome SP Dev Tools</h3>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="list-group">
                        {opts}
                    </div>
                </div>
            </div>
        </div>
    }
}