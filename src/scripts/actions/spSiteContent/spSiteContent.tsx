/// <reference path="../../../../typings/index.d.ts"/>
/// <reference path="./../common/styles.ts"/>
/// <reference path="./../common/interfaces.ts"/>

import * as React from 'react';
import WorkingOnIt from './../common/WorkingOnIt';
import MessageBar from './../common/MessageBar';
import { MessageType } from './../common/enums';
import { SpSiteContentStyles as styles } from './../common/Styles'
import SpSiteContentItem  from './spSiteContentItem';

interface SpSiteContentProps {
    appContainerId: string,
    closeWindowFunction:any
}
interface SpSiteContentState {
    isWorkingOnIt: boolean,
    siteLists: Array<ISiteContent>,
    showMessage: boolean,
    messageType: MessageType,
    message: string,
    showHidden: boolean,
    openInNewTab: boolean
}

export default class SpSiteContent extends React.Component<SpSiteContentProps, SpSiteContentState> {
    constructor() {
        super();
        this.state = {
            isWorkingOnIt: true,
            siteLists: [],
            showMessage: false,
            messageType: MessageType.Info,
            message: '',
            showHidden: true,
            openInNewTab: true
        } as SpSiteContentState;
    }
    private getWebProperties() {
        let ctx = SP.ClientContext.get_current();
        let web = ctx.get_web();

        let siteConetent = web.get_lists();
        ctx.load(web);
        ctx.load(siteConetent, 'Include(RootFolder,Title,Id,Hidden,ItemCount,Created,ImageUrl,LastItemModifiedDate,Description,ParentWebUrl)');

        let onSuccess: Function = Function.createDelegate(this, (sender: any, err: any) => {

            let items: Array<ISiteContent> = [], listEnumerator: any = siteConetent.getEnumerator();

            while (listEnumerator.moveNext()) {
                let oList: any = listEnumerator.get_current();
                let listId: any = oList.get_id();
                let listItem: ISiteContent = {
                    id: listId,
                    title: oList.get_title(),
                    description: oList.get_description(),
                    hidden: oList.get_hidden(),
                    itemCount: oList.get_itemCount(),
                    imageUrl: oList.get_imageUrl(),
                    created: oList.get_created(),
                    lastModified: oList.get_lastItemModifiedDate(),
                    listUrl: oList.get_rootFolder().get_serverRelativeUrl(),
                    settingsUrl: oList.get_parentWebUrl() + '/_layouts/15/listedit.aspx?List=' + listId
                }
                items.push(listItem);
                this.setState({
                    siteLists: items,
                    isWorkingOnIt: false
                } as SpSiteContentState);
            }
            items.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
        });
        let onError: Function = Function.createDelegate(this, (sender: any, err: any) => {
            SP.UI.Notify.addNotification("Failed to get web lists...<br>" + err.get_message(), false);
            console.log(err);
            this.props.closeWindowFunction(this.props.appContainerId);
        });
        ctx.executeQueryAsync(onSuccess, onError);
    }
    private showHidden(e: any) {
        this.setState({
            showHidden: e.target.checked
        } as SpSiteContentState);
    }
    private openInNewTab(e: any) {
        this.setState({
            openInNewTab: e.target.checked
        } as SpSiteContentState);
    }
    private componentDidMount() {
        this.getWebProperties();
    }
    public render() {
        if (this.state.isWorkingOnIt) {
            return <WorkingOnIt/>
        } else {
            var lists: any;
            if (this.state.showHidden) {
                lists = this.state.siteLists;
            } else {
                lists = this.state.siteLists.filter((list: ISiteContent, index: number) => {
                    return !list.hidden;
                });
            }

            var siteContent = lists.map((list: ISiteContent, index: number) => { return (<SpSiteContentItem item={list} key={index} openInNewTab={this.state.openInNewTab} />); });
            return (
                <div style={styles.contentStyles}>
                    <MessageBar message={this.state.message} messageType={this.state.messageType} showMessage={this.state.showMessage} />
                    <div style={styles.checksContainer}>
                        <div style={styles.check}>
                            <label htmlFor="showHiddenInput">Show hidden</label>
                            <input type="checkbox" id="showHiddenInput" checked={this.state.showHidden} onChange={this.showHidden.bind(this) }/>
                        </div>
                        <div style={styles.lastCheck}>
                            <label htmlFor="openInNewTabInput">Open links in new tab</label>
                            <input type="checkbox" id="openInNewTabInput" checked={this.state.openInNewTab} onChange={this.openInNewTab.bind(this) }/>
                        </div>
                    </div>
                    <ul style={styles.list}>
                        {siteContent}
                    </ul>
                </div>);

        }
    }
}