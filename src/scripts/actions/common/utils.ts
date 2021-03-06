
export default class Utils {
    public static capitalize(srt: string): string {
        return srt.charAt(0).toUpperCase() + srt.slice(1);
    }
    public static loadScript(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            script.onload = function () {
                resolve();
            };
            head.appendChild(script);
        });
    }
    public static ensureSPObject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof SP == 'undefined') {
                var scriptbase = _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/";
                this.loadScript(scriptbase + "SP.Runtime.js").then(() => {
                    this.loadScript(scriptbase + "SP.js").then(() => {
                        resolve();
                    });
                });
            } else {
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                    resolve();
                });
            }
        });
    }
    public static mergeObjects(...objs: any[]): any {
        let extended: any = {};
        let deep: boolean = false;
        let i: number = 0;
        let length: number = arguments.length;

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj: any) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = this.mergeObjects(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    }
}