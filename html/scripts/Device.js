//==============================================================
//儲存 Kiosk 呼叫 外接裝置 的共用Method
//如有修改須求，前請告知ted或hank
//Mvoed by ted 2017/08/28

//修改歷程
//2017/08/28 Moved by ted

//==============================================================
//2017/09/01 從Mainapp搬移過來
kiosk.API.Device = kiosk.API.Device || {};
(function () {

    // Scanner 相關 Method
    kiosk.API.Device = kiosk.API.Device || {};

    // Control Box
    kiosk.API.Device.ControlBox = {
        DeviceAction:
            {
                DisConnect: 0,
                Connect: 1,
                LEDA: 2,
                LEDB: 3,
                LEDC: 4,
                LEDD: 5,
                SystemFAN: 6,
                SystemSpeaker: 7,
                USB1: 8,
                USB2: 9,
                USB3: 10,
                USB4: 11,
                USB5: 12,
                USB6: 13,
                SecondMonitor: 14,
                GetUPSBackupBattery: 15,
                GetFANSpeed: 16,
                GetTemperature: 17,
                GetCPUUsage: 18,
                GetMemorySpace: 19,
                GetHDDStatus: 20,
                ResetSystem: 21,
                ControlBoxStatus: 22
            },
        KioskOption: {
            Close: 0,
            Open: 1,
            Get_status_for_now: 2,
            LEDFlashMode: 3
        },
        KioskFAN: {
            FAN1_Off_FAN2_Off: 0,
            FAN1_On_FAN2_Off: 1,
            FAN1_Off_FAN2_On: 2,
            FAN1_On_FAN2_On: 3
        },
        generuteParemater: function (action, paremater) {
            var deviceCmd =
                {
                    option: 0,
                    sysFAN: 0,
                    hddStr: 'C:'
                },
                actionCmd =
                    {
                        Action: action,
                        Parameter: JSON.stringify($.extend(deviceCmd, paremater))
                    },
                cmd =
                    {
                        "DeviceName": "ControlBox",
                        "Worktype": "PostRequest",
                        "Paremater": JSON.stringify(actionCmd),
                        "ReponseModule": "UI",
                    };
            return cmd;
        },
        DisConnect: function (success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(self.DeviceAction.DisConnect)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success(result);
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
        Connect: function (success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(self.DeviceAction.Connect)),
                function (res) {
                    kiosk.API.log.logInfo(res, 'Connect');
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success(result);
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },

        /*
         * option @KioskFAN
         */
        SetSystemFAN: function (option, success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(self.DeviceAction.SystemFAN, { sysFAN: option })),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success();
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
        /*
         * option @KioskOption
         */
        SetSystemSpeaker: function (option, success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(self.DeviceAction.SystemSpeaker, { option: option })),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success();
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
        /*
         * action @StatusAction
         */
        GetStatus: function (action, success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(action)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success(result);
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
        /*
         * action @LEDAction
         * option @KioskOption
         * para @object {flashOffTime:@int,flashOnTime:@int}
         */
        SetLED: function (action, option, success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(action, { option: option })),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success();
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
        /*
         * action @USBAction
         * option @KioskOption
         */
        SetUSB: function (action, option, success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(action, { option: option })),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success)
                            success();
                    } else {
                        if (fail)
                            fail(result.message);
                    }
                });
        },
    };

    // Scanner 相關 Method
    kiosk.API.Device.Scanner = {
        generuteParemater: function (action, regex, fliePath, retryDelay) {
            var scannerCmd = {
                regex: regex || '',
                fliePath: fliePath || '',
                RetryDelay: retryDelay || 300
            },
                actionCmd = {
                    Action: action,
                    Paremater: JSON.stringify(scannerCmd)
                },
                cmd = {
                    "DeviceName": "Scanner",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        startScanner: function (regex, success, fail) {
            var self = this;
            if (testFlag.offScanner) {
                setTimeout(function () {
                    success({ IsSuccess: true, Result: '55485445521588' });
                }, 3000)
            } else {
                kiosk.API.Device.postToDeviceWithCallback(JSON.stringify(self.generuteParemater("ScanningBarCode", regex)),
                    function (res) {
                        var result = JSON.parse(res);
                        if (result.IsSuccess) {
                            if (success) success(result.Result);
                        } else if (fail && result) {
                            fail(result.Message, result.Message == "Task Canecl");
                        } else {
                            kiosk.API.log.logError(res, 'startScanner', 'Scanner');
                        }

                    });
            }

        },
        stopScanner: function (success, fail) {
            var self = this;
            if (!testFlag.offScanner)
                kiosk.API.Device.postToDeviceWithCallback(JSON.stringify(this.generuteParemater("Close")), function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success) success(result);
                    } else if (fail && result) {
                        if (fail) fail(result);
                    }
                    else
                        kiosk.API.log.logError(res, 'stopScanner', 'Scanner');
                });
        },
        openScanner: function (success, fail) {
            if (!testFlag.offScanner)
                kiosk.API.Device.postToDeviceWithCallback(JSON.stringify(this.generuteParemater("Open")), function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success) success(result);
                    } else if (fail) {
                        fail(result);
                    } else
                        kiosk.API.log.logError(res, 'openScanner', 'Scanner');

                });
        },
        resetScanner: function (success, fail) {
            if (!testFlag.offScanner)
                kiosk.API.Device.postToDeviceWithCallback(JSON.stringify(this.generuteParemater("Reset")), function (res) {
                    //debugger;
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success) success(result);
                    } else if (fail && result) {
                        fail(result);
                    } else
                        kiosk.API.log.logError(res, 'resetScanner', 'Scanner');

                });
        },
        getStatus: function (success, fail) {
            if (!testFlag.offScanner)
                kiosk.API.Device.postToDeviceWithCallback(JSON.stringify(this.generuteParemater("GetDeviceStatus")), function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        if (success) success(result);
                    } else if (fail) {
                        fail(result);
                    }

                });
        }
    };

    // Thermal 相關 Method
    kiosk.API.Device.Thermal = {
        DeviceName: '',
        setAttr: function (tag, el) {
            if (el.attributes) {
                $.each(el.attributes,
                    function (index, attr) {
                        tag.Attubites[attr.name] = attr.value;
                    });
            }
        },
        TagModel: {
            THERMAL_CUTPAGE: function (el) {
                return { Type: el.localName };
            },

            THERMAL_TEXT: function (el) {
                var self = this,
                    tag = {
                        Attubites: {
                            height: 1,
                            width: 1,
                            wide_character: 1,
                            bold: false,
                            tab: 0,
                            underline: false,
                            alignment: 'left'
                        },
                        InnerText: el.textContent,
                        Type: el.localName
                    };
                kiosk.API.Device.Thermal.setAttr(tag, el);
                return tag;
            },

            THERMAL_BITMAP: function (el) {
                var tag = {
                    Attubites: {
                        file: '',
                        size: 0,
                        alignment: 'left'
                    },
                    InnerText: el.textContent,
                    Type: el.localName
                };
                kiosk.API.Device.Thermal.setAttr(tag, el);
                return tag;
            },

            THERMAL_BARCODE: function (el) {
                var tag = {
                    Attubites: {
                        size: 80,
                        position: 'below',
                        code_type: 'Code128',
                        alignment: 'left'
                    },
                    InnerText: el.textContent,
                    Type: el.localName
                };
                kiosk.API.Device.Thermal.setAttr(tag, el);
                return tag;
            },
            THERMAL_QRCODE: function (el) {
                var tag = {
                    Attubites: {
                        size: 150,
                        alignment: 'left'
                    },
                    InnerText: el.textContent,
                    Type: el.localName
                };
                kiosk.API.Device.Thermal.setAttr(tag, el);
                return tag;
            },
            THERMAL_SUBCONTENT: function (el) {
                var tag = {
                    Attubites: {
                        datasource: ''
                    },
                    child: [],
                    Type: el.localName
                };
                kiosk.API.Device.Thermal.setAttr(tag, el);

                $.each(el.childNodes, function (key, child) {
                    if (child.nodeType == 1) {
                        tag.child.push(kiosk.API.Device.Thermal.TagModel[child.tagName](child));
                    }
                });
                return tag;
            },
            THERMAL_MARKFEED: function (el) {
                var tag = {
                    Attubites: {
                        feedtype: ''
                    },
                    InnerText: el.textContent,
                    Type: el.localName
                };
                kiosk.API.Device.Thermal.setAttr(tag, el);
                return tag;
            }
        },
        receiptTemplate: undefined,
        generateTemplate: function (xmltxt) {
            var self = {};
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmltxt, "text/xml");
            $.each(xmlDoc.getElementsByTagName('THERMAL_PRINT'),
                function (key, type) {
                    self[type.getAttribute('id').toLowerCase()] = [];
                    $.each(type.getElementsByTagName('THERMAL_PAGE'),
                        function (key, page) {
                            var pageModel = {
                                tags: [],
                                rotation: 'normal',
                                markfeed: undefined
                            };

                            if (page.getAttribute('rotation')) {
                                pageModel.rotation = page.getAttribute('rotation');
                            }
                            if (page.getAttribute('markfeed')) {
                                pageModel.markfeed = page.getAttribute('markfeed');
                            }
                            if (page.getAttribute('loop-for')) {
                                pageModel.loopfor = page.getAttribute('loop-for');
                            }
                            $.each(page.childNodes,
                                function (key, child) {
                                    try {
                                        pageModel.tags.push(new kiosk.API.Device.Thermal.TagModel[child.tagName](child));
                                    } catch (e) {
                                        //console.log(child.tagName);
                                        //console.log(child);
                                    }
                                });
                            pageModel.tags.push(new kiosk.API.Device.Thermal.TagModel.THERMAL_TEXT({
                                textContent: '',
                                localName: 'THERMAL_TEXT'
                            }));
                            self[type.getAttribute('id').toLowerCase()].push(pageModel);
                        });
                });
            return self;
        },
        generuteParemater: function (action, content, workType) {
            var deviceCmd = {
                Content: content ? content.content || '' : "",
                Size: content ? content.Size || "0" : "0",
                Alignment: content ? content.Alignment || "" : "",
                Position: content ? content.Position || "" : "",
                CodeType: content ? content.CodeType || "" : "",
                DEVICE_NAME: this.DeviceName //'RP-600_COM1'
            },
                actionCmd = {
                    Action: action,
                    Paremater: JSON.stringify(deviceCmd)
                },
                cmd = {
                    "DeviceName": "Thermal",
                    "Worktype": workType || "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        generuteParemater_EPrint: function (action, content, jsonString) {
            var deviceCmd = {
                Content: content ? content.content || '' : "",
                Size: content ? content.Size || "0" : "0",
                Alignment: content ? content.Alignment || "" : "",
                Position: content ? content.Position || "" : "",
                CodeType: content ? content.CodeType || "" : "",
                DEVICE_NAME: this.DeviceName,
                EPageSpcJson: jsonString
            },
                actionCmd = {
                    Action: action,
                    Paremater: JSON.stringify(deviceCmd)
                },
                cmd = {
                    "DeviceName": "Thermal",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        parseSubContent: function (subTag, subData) {
            var tags = [];
            $.each(subData, function (key, obj) {
                $.each(subTag.child, function (k, tag) {
                    var tagTemp = $.extend(true, {}, tag);
                    if (tagTemp.Type != 'THERMAL_SUBCONTENT') {
                        if (tagTemp.Type != 'THERMAL_CUTPAGE') {
                            var isNull = false;
                            tagTemp.InnerText = tagTemp.InnerText.replace(/\{\{(.*?)\}\}/g, function (match, token) {
                                if (obj[token])
                                    return obj[token];
                                isNull = true;
                                return '';
                            });
                            if (!isNull) {
                                tags.push(tagTemp);
                            }
                        } else {
                            tags.push(tagTemp);
                        }
                    } else {
                        global.API.concat(tags, self.parseSubContent(tagTemp, data[tagTemp.Attubites.datasource]));
                    }
                });
            });
            return tags
        },
        Open: function () {
            kiosk.API.Device.postToDeviceWithoutCallback(JSON.stringify(this.generuteParemater("Open")));
        },
        CutPaper: function () {
            kiosk.API.Device.postToDeviceWithoutCallback(
                JSON.stringify(this.generuteParemater("CutPaper", { content: 0 })));
        },
        PrintText: function (text) {
            kiosk.API.Device.postToDeviceWithoutCallback(
                JSON.stringify(this.generuteParemater("PrintText", { content: text })));
        },
        PrintBitmap: function (filePath, size, alignment) {
            kiosk.API.Device.postToDeviceWithoutCallback(JSON.stringify(this.generuteParemater("PrintBitmap"), {
                Content: filePath,
                Size: size || 229,
                Alignment: alignment || 'Center',
            }));
        },
        PrintBarCode: function (code, size, alignment, position, codeType) {
            debugger;
            kiosk.API.Device.postToDeviceWithoutCallback(JSON.stringify(this.generuteParemater("PrintBarCode"), {
                Content: code,
                Size: size || 80,
                Alignment: alignment || 'Center',
                Position: position || 'Below',
                CodeType: codeType || 'Code128'
            }));
        },
        PrintQRCode: function (code, size, alignment, position) {
            kiosk.API.Device.postToDeviceWithoutCallback(JSON.stringify(this.generuteParemater("PrintQRCode"), {
                Content: code,
                Size: size || 150,
                Alignment: alignment || 'Center',
                Position: position || 'Below',
            }));
        },
        CheckNearEnd: function () {
            return kiosk.API.Device.sendToDevice(
                JSON.stringify(this.generuteParemater("CheckNearEnd", {}, 'SendRequest')));
        },
        parsePage: function (tags, data) {
            var pageTags = [];
            var self = this;
            $.each(tags,
                function (k, tag) {
                    var isNull = true,
                        isReplase = false;
                    if (tag.Type != 'THERMAL_SUBCONTENT') {
                        tag.InnerText = tag.InnerText.replace(/\{\{(.*?)\}\}/g,
                            function (match, token) {
                                isReplase = true;
                                if (data[token]) {
                                    isNull = false;
                                    return data[token];
                                } else {
                                    isNull = isNull && true;
                                }
                                return '';
                            });
                        if (!isNull || !isReplase) {
                            pageTags.push(tag);
                        }
                    } else {
                        var childsTag = self.parseSubContent(tag, data[tag.Attubites.datasource]);
                        kiosk.API.concat(pageTags, childsTag);
                    }
                });
            return pageTags;
        },
        PrintTemplatePage: function (deviceName, receiptType, data, callback) {

            //if (testFlag.viewDebugger) {
            //    return;
            //}
            var self = this;
            self.DeviceName = deviceName;
            if (!self.receiptTemplate) {
                self.GetTemplate();
            }

            var pageTemplate = $.extend(true, {}, self.receiptTemplate[receiptType.toLowerCase()]);
            var result;
            $.each(pageTemplate, function (key, page) {
                var np = $.extend(true, {}, page);
                var cmd = self.generuteParemater("PrintTemplatePage", {
                    content: JSON.stringify([{
                        tags: self.parsePage(np.tags, data),
                        rotation: page.rotation,
                        markfeed: page.markfeed

                    }])
                })
                result = JSON.parse(kiosk.API.Device.sendToDevice(JSON.stringify(cmd)));
                if (!result.IsSuccess) {
                    return false;
                }

            });
            return result;
        },
        GetTemplate: function () {
            var self = this;
            /* if (testFlag.viewDebugger) {
                var result = {
                    "IsSuccess": "true",
                    "IsNearEnd": "false",
                    "Result": "\r\n\r\n<THERMAL_TEMPLATE>\r\n\t<THERMAL_PRINT id=\"DigitalPin\">\r\n\t\t<THERMAL_PAGE>\t\t\t\r\n\t\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" >This is not a </THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" bold=\"true\" underline=\"true\">RECEIPT</THERMAL_TEXT>\t\r\n\t\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\t\t\t\r\n\t\t\t\t<THERMAL_BARCODE alignment=\"center\" size=\"100\" >{{code}}</THERMAL_BARCODE>\t\r\n\t\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Printed:{{now}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Store ID:{{storeCode}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Description:{{prodcutName}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Amount:{{cruuency}}{{amount}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT tab=\"1\">Please proceed for payment\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT tab=\"1\">at the cashier counter within\\r\\n</THERMAL_TEXT>\r\n\t\t\t\t<THERMAL_TEXT tab=\"1\">30 minutes before it expires\\r\\n</THERMAL_TEXT>\t\t\t\t\t\t\t\r\n\t\t</THERMAL_PAGE>\r\n\t</THERMAL_PRINT>\r\n\t<THERMAL_PRINT id=\"InstantTopup\">\r\n\t\t<THERMAL_PAGE>\r\n\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" >This is not a </THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" bold=\"true\" underline=\"true\">RECEIPT</THERMAL_TEXT>\t\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\t\t\t\r\n\t\t\t<THERMAL_BARCODE alignment=\"center\" size=\"100\" >{{code}}</THERMAL_BARCODE>\t\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Printed:{{now}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Store ID:{{storeCode}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Description:{{prodcutName}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" tab=\"1\">Amount:{{cruuency}}{{amount}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">Please proceed for payment\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">at the cashier counter within\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">30 minutes before it expires\\r\\n</THERMAL_TEXT>\r\n\t\t</THERMAL_PAGE>\r\n\t</THERMAL_PRINT>\r\n\t<THERMAL_PRINT id=\"BillPayment\">\r\n\t\t<THERMAL_PAGE>\r\n\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" >This is not a </THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT wide_character=\"2\" alignment=\"center\" bold=\"true\" underline=\"true\">RECEIPT</THERMAL_TEXT>\t\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\t\t\t\r\n\t\t\t<THERMAL_BARCODE alignment=\"center\" size=\"100\" >{{code}}</THERMAL_BARCODE>\t\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" >Printed:{{now}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" >Store ID:{{storeCode}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" >Description:{{prodcutName}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT  height=\"2\" >Amount:{{cruuency}}{{amount}}\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT>\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">Please proceed for payment\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">at the cashier counter within\\r\\n</THERMAL_TEXT>\r\n\t\t\t<THERMAL_TEXT tab=\"1\">30 minutes before it expires\\r\\n</THERMAL_TEXT>\r\n\t\t</THERMAL_PAGE>\r\n\t</THERMAL_PRINT>\t\r\n</THERMAL_TEMPLATE>",
                    "Error": null
                }
            } else {
                var xmlStr =
                    kiosk.API.Device.sendToDevice(JSON.stringify(this.generuteParemater("GetTemplateXML", {})));
                var result = JSON.parse(xmlStr);
            } */
            var xmlStr =
                kiosk.API.Device.sendToDevice(JSON.stringify(this.generuteParemater("GetTemplateXML", {})));
            var result = JSON.parse(xmlStr);

            var xmltxt = result.Result;
            self.receiptTemplate = self.generateTemplate(xmltxt);
        },
        getStatus: function (deviceName, callback) {
            var self = this;
            self.DeviceName = deviceName;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(self.generuteParemater("GetDeviceStatus")),
                function (res) {
                    callback(JSON.parse(res));
                });
        },
        ElecPrint: function (deviceName, callback, jsonString) {
            var self = this;
            self.DeviceName = deviceName;
            kiosk.API.Device.postToDeviceWithCallback
                (
                JSON.stringify(self.generuteParemater_EPrint("ElecPrint", undefined, jsonString)),
                function (res) { callback(JSON.parse(res)); }
                );
        },
        OnlyInvoice: function (deviceName, callback, jsonString) {
            var self = this;
            self.DeviceName = deviceName;
            kiosk.API.Device.postToDeviceWithCallback
                (
                JSON.stringify(self.generuteParemater_EPrint("OnlyInvoice", undefined, jsonString)),
                function (res) { callback(JSON.parse(res)); }
                );
        },
        OnlyReceipt: function (deviceName, callback, jsonString) {
            var self = this;
            self.DeviceName = deviceName;
            kiosk.API.Device.postToDeviceWithCallback
                (
                JSON.stringify(self.generuteParemater_EPrint("OnlyReceipt", undefined, jsonString)),
                function (res) { callback(JSON.parse(res)); }
                );
        }
    };

    kiosk.API.Device.FIN = {
        DeviceAction: {
            ECCInit: 0,
            ECCPayment: 1,
            ECCCardData: 2,
            ECCSettle: 3,
            ECCDeviceCheck: 4,
            O2OQrCode: 5,
            O2OQuery: 7,
            O2ORefund: 8,
            CTBCPayment: 9,
            CTBCSettle: 10,
            CTBCLastData: 11,
            CTBCConnCheck: 12,
            CTBCSlotCheck: 13
        },
        generuteParemater_ECC: function (action, PtransDate, PtransTime, amt) {
            var DeviceCmd = {
                ctbc_amt: amt,
                ctbc_store: null,
                ctbc_cardType: null,
                eccReq: {
                    transDate: PtransDate,
                    transTime: PtransTime,
                    transAmt: amt,
                    retryTransaction: '1',
                    batchNo: '0'
                },
                o2oReqQrCode: null,
                o2oReqPayment: null,
                o2oReqQuery: null,
                o2oReqFund: null
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "FIN",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        generuteParemater_O2OQRCODE: function (action, ORDERSTR, TIMESTR, amt) {
            var DeviceCmd = {
                ctbc_amt: amt,
                ctbc_store: null,
                ctbc_cardType: null,
                eccReq: null,
                o2oReqQrCode: {
                    amount: '3',
                    redirectimage: 'N',
                    timestamp: TIMESTR,
                    includeamt: 'Y',
                    orderid: ORDERSTR,
                    ordername: 'IPHONEX',
                    ordermemo: 'IPHONEX',
                    redirectimagesize: 'M'
                },
                o2oReqPayment: null,
                o2oReqQuery: null,
                o2oReqFund: null
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "FIN",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        generuteParemater_O2OQUERY: function (action, ORDERSTR, TIMESTR, TYPESTR, amt) {
            var DeviceCmd = {
                ctbc_amt: amt,
                ctbc_store: null,
                ctbc_cardType: null,
                eccReq: null,
                o2oReqQrCode: null,
                o2oReqPayment: null,
                o2oReqQuery: {
                    id: ORDERSTR,
                    timestamp: TIMESTR,
                    type: TYPESTR
                },
                o2oReqFund: null
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "FIN",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        generuteParemater: function (action, amt, store, cardType) {
            var DeviceCmd = {
                ctbc_amt: amt,
                ctbc_store: store,
                ctbc_cardType: cardType || '01',
                eccReq: null,
                o2oReqQrCode: null,
                o2oReqPayment: null,
                o2oReqQuery: null,
                o2oReqFund: null
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "FIN",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        CTBCPayment: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CTBCPayment, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'CTBCPayment', 'FIN');
                    }
                });
        },
        CTBCSettle: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CTBCSettle, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'CTBCSettle', 'FIN');
                    }
                });
        },
        CTBCLastData: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CTBCLastData, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'CTBCLastData', 'FIN');
                    }
                });
        },
        CTBCConnCheck: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CTBCConnCheck, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'CTBCConnCheck', 'FIN');
                    }
                });
        },
        CTBCSlotCheck: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CTBCSlotCheck, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'CTBCSlotCheck', 'FIN');
                    }
                });
        },
        ECCInit: function (success, fail, P1, P2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_ECC(this.DeviceAction.ECCInit, P1, P2)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'ECCInit', 'FIN');
                    }
                });
        },
        ECCPayment: function (success, fail, P1, P2, P3) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_ECC(this.DeviceAction.ECCPayment, P1, P2, P3)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'ECCPayment', 'FIN');
                    }
                });
        },
        ECCCardData: function (success, fail, P1, P2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_ECC(this.DeviceAction.ECCCardData, P1, P2)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'ECCCardData', 'FIN');
                    }
                });
        },
        ECCSettle: function (success, fail, P1, P2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_ECC(this.DeviceAction.ECCSettle, P1, P2)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'ECCSettle', 'FIN');
                    }
                });
        },
        ECCDeviceCheck: function (success, fail, P1, P2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_ECC(this.DeviceAction.ECCDeviceCheck, P1, P2)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'ECCDeviceCheck', 'FIN');
                    }
                });
        },
        O2OQrCode: function (success, fail, ORDERID, TIMESTR) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_O2OQRCODE(this.DeviceAction.O2OQrCode, ORDERID, TIMESTR)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'O2OQrCode', 'FIN');
                    }
                });
        },
        O2OQuery: function (success, fail, ORDERID, TIMESTR, TYPESTR) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_O2OQUERY(this.DeviceAction.O2OQuery, ORDERID, TIMESTR, TYPESTR)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'O2OQuery', 'FIN');
                    }
                });
        },
        O2ORefund: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.O2ORefund)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'O2ORefund', 'FIN');
                    }
                });
        },
    };
    // ID、PassPort Scanner
    kiosk.API.Device.WFX = {
        status: {
            isConnect: false,
            isGetting: false,
        },
        DeviceAction: {
            init: 0,
            getData: 1,
            stopGet: 2,
            deviceStatus: 3,
            exit: 4
        },
        generuteParemater: function (action) {
            var DeviceCmd = {
                serialTimeout: 100,
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "WFX",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        init: function (success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.init)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    } else if (fail && result) {
                        fail(result.Error);
                    } else
                        kiosk.API.log.logError(res, 'connect', 'WFX');
                });
        },
        exit: function (success, fail) {
            var self = this;

            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.exit)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        self.status.isConnect = false;
                        success(result);
                    } else {
                        fail(result.message);
                    }
                });
        },
        getData: function (success, fail) {

            var self = this,
                excute = function () {
                    kiosk.API.Device.postToDeviceWithCallback(
                        JSON.stringify(self.generuteParemater(self.DeviceAction.getData)),
                        function (res) {
                            self.status.isGetting = false;
                            var result = JSON.parse(res);
                            try {
                                if (result.IsSuccess) {
                                    success(result);
                                } else
                                    success(result);
                            } catch (ex) {
                                if (fail)
                                    fail('資料讀取失敗');
                                else
                                    kiosk.API.log.logError(res, 'getData', 'WFX');
                            }

                        });
                };
            excute();
        },
        stopGet: function (success, fail) {

            var self = this,
                excute = function () {
                    kiosk.API.Device.postToDeviceWithCallback(
                        JSON.stringify(self.generuteParemater(self.DeviceAction.stopGet)),
                        function (res) {
                            var result = JSON.parse(res);
                            try {
                                if (result.IsSuccess) {
                                    success(result);
                                } else if (fail && result) {
                                    fail(result.message, result.isCancel);
                                } else
                                    kiosk.API.log.logError(res, 'stopGet', 'WFX');
                            } catch (ex) {
                                if (fail)
                                    fail('資料讀取失敗');
                                else
                                    kiosk.API.log.logError(ex.message, 'stopGet', 'WFX');
                            }
                        });
                };
            excute();
        },
        deviceStatus: function (success, fail) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.deviceStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    } else if (fail && result) {
                        fail(result.message);
                    } else
                        kiosk.API.log.logError(res, 'deviceStatus', 'WFX');
                });
        },
        getStatus: function (callback) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.deviceStatus)),
                function (res) {
                    callback(JSON.parse(res));
                });
        },
    };
    // === ICASH API START ===
    kiosk.API.Device.ICASHAPI = {
        DeviceAction: {
            ICASHInit: 0,
            ICASHCardData: 1,
            ICASHPayment: 2,
            ICASHDeviceCheck: 3,
            FTPUpload: 4,
            FTPDownload: 5,
        },
        generuteParemater: function (action, p1, p2, p3, p4, p5) {
            var DeviceCmd = {
                functionName: p1,
                pollingSec: p2,
                transAmt: p3,
                orderID: p4,
                seq: p5
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "ICASHAPI",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        ICASHInit: function (success, p1, p5) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.ICASHInit, p1, undefined, undefined, undefined, p5)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        ICASHCardData: function (success, p1, p2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.ICASHCardData, p1, p2)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        ICASHPayment: function (success, p1, p2, p3, p4, p5) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.ICASHPayment, p1, p2, p3, p4, p5)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        ICASHDeviceCheck: function (success, p1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.ICASHDeviceCheck, p1)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        FTPUpload: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.FTPUpload)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        FTPDownload: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.FTPDownload)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        getStatus: function (callback) {
            var self = this;
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.deviceStatus)),
                function (res) {
                    callback(JSON.parse(res));
                });
        },
    };
    // === ICASH API E N D ===

    // === ICT API START ===
    kiosk.API.Device.CashBox = {
        DeviceAction: {
            openDevice: 0,
            deviceStatus: 1,
            paymentStatus: 2,
            begPayment: 3,
            endPayment: 4,
            cancelPayment: 5,
            setNdNumber: 6,
            closeDevice: 7
        },
        generuteParemater: function (action, com, N1, N2, transAmount) {
            var cashBoxCmd = {
                comPort: com || 'COM4',
                ndNumArg1: N1 || 0,
                ndNumArg2: N2 || 0,
                begPaymentArg: transAmount || 0
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(cashBoxCmd),
                },
                cmd = {
                    "DeviceName": "CashBox",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        openDevice: function (success, p1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.openDevice, p1)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        deviceStatus: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.deviceStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        paymentStatus: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.paymentStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        begPayment: function (success, transAmount) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.begPayment, undefined, undefined, undefined, transAmount)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        endPayment: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.endPayment)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        cancelPayment: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.cancelPayment)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        setNdNumber: function (success, p1, p2) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.setNdNumber, undefined, p1, p2)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        closeDevice: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.closeDevice)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
    };
    // === ICT API E N D ===

    // === EZ710BU START ===
    kiosk.API.Device.EZ710BU = {
        DeviceAction: {
            Initialize: 0,
            GetMifreData: 1,
            GetSmartCardData: 2,
            StopGet: 3,
            GetHotelCardData: 4,
            SetHotelCardData: 5
        },
        generuteParemater: function (action) {
            var DeviceCmd = {
                hotelReq: null
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "EZ710BU",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        generuteParemater_Hotel: function (action, keyType, keyString, sector, b0, b1, b2, jSonString) {
            var DeviceCmd = {
                hotelReq: {
                    keyType: keyType,
                    keyHexString: keyString,
                    sector: sector,
                    b0: b0,
                    b1: b1,
                    b2: b2,
                    jSonString: jSonString
                }
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "EZ710BU",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        Initialize: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Initialize)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_Initialize', 'EZ710');
                    }
                });
        },
        GetMifreData: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.GetMifreData)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_GetMifreData', 'EZ710');
                    }
                });
        },
        GetSmartCardData: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.GetSmartCardData)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_GetSmartCardData', 'EZ710');
                    }
                });
        },
        StopGet: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.StopGet)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_StopGet', 'EZ710');
                    }
                });
        },
        GetHotelCardData: function (success, fail, keyType, keyString, sector) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_Hotel(this.DeviceAction.GetHotelCardData, keyType, keyString, sector)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_GetHotelCardData', 'EZ710');
                    }
                });
        },
        SetHotelCardData: function (success, fail, keyType, keyString, sector, block0, block1, block2, jsonString) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater_Hotel(this.DeviceAction.SetHotelCardData, keyType, keyString, sector, block0, block1, block2, jsonString)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EZ710_SetHotelCardData', 'EZ710');
                    }
                });
        },
    };
    // === EZ710BU E N D ===

    // === EPRINTER START ===
    kiosk.API.Device.EPRINTER = {
        DeviceAction: {
            printOpen: 0,
            printClose: 1,
            paperPrint: 2
        },
        generuteParemater: function (action, printerName) {
            var DeviceCmd = {
                printerName: printerName
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "EPRINTER",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        PrinterOpen: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.printOpen)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EPRINTER_PrinterOpen', 'EPRINTER');
                    }
                });
        },
        PrinterClose: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.printClose)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EPRINTER_PrinterClose', 'EPRINTER');
                    }
                });
        },
        PaperPrint: function (success, fail, printerName) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.paperPrint, printerName)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'EPRINTER_PaperPrint', 'EPRINTER');
                    }
                });
        }
    };
    // === EPRINTER E N D ===

    // === HSENSOR START ===
    kiosk.API.Device.HSENSOR = {
        DeviceAction: {
            DisConnect: 0,
            Connect: 1,
            GetData: 2,
            StopGet: 3,
            DeviceStatus: 4
        },
        generuteParemater: function (action, comPort, comRate) {
            var DeviceCmd = {
                comPort: comPort,
                comRate: comRate
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "HSENSOR",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        DisConnect: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.DisConnect)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HSENSOR_DisConnect', 'HSENSOR');
                    }
                });
        },
        Connect: function (success, fail, comPort, comRate) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Connect, comPort, comRate)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HSENSOR_Connect', 'HSENSOR');
                    }
                });
        },
        GetData: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.GetData)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HSENSOR_GetData', 'HSENSOR');
                    }
                });
        },
        StopGet: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.StopGet)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HSENSOR_StopGet', 'HSENSOR');
                    }
                });
        },
        DeviceStatus: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.DeviceStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HSENSOR_DeviceStatus', 'HSENSOR');
                    }
                });
        }
    };


    // === Honeywell Scanner ===
    kiosk.API.Device.HONEYWELLSCANNER = {
        DeviceAction: {
            Open: 0,
            Close: 1,
            Scan: 2,
            Cancel: 3,
            OpenStatus: 4
        },
        generuteParemater: function (action, comPort, timeoutStr) {
            var DeviceCmd = {
                comPort: comPort,
                timeoutStr: timeoutStr
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "HONEYWELLSCANNER",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        Open: function (success, fail, comPort) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Connect, comPort)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_Connect', 'HONEYWELLSCANNER');
                    }
                });
        },
        Close: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Close)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_DisConnect', 'HONEYWELLSCANNER');
                    }
                });
        },
        Scan: function (success, fail, comPort, timeoutValue) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Scan, comPort, timeoutValue)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_GetData', 'HONEYWELLSCANNER');
                    }
                });
        },
        Cancel: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Cancel)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_Cancel', 'HONEYWELLSCANNER');
                    }
                });
        },
        OpenStatus: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.OpenStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_OpenStatus', 'HONEYWELLSCANNER');
                    }
                });
        }

    };

    //=== EWTK 發卡機 ===
    kiosk.API.Device.EWTKLIB = {
        DeviceAction: {
            Open: 0,
            Close: 1,
            ClearError: 2,
            RequestStatus: 3,
            IssueCard: 4,
            MoveCard: 5,
            RomVersion: 6,
            CleanCard: 7
        },
        generuteParemater: function (action, comPort, baudrate, position_str) {
            var DeviceCmd = {
                comPort: comPort,
                baudrate: baudrate,
                position: position_str
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "EWTKLIB",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        Open: function (success, fail, comPort, baudrate) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Open, comPort, baudrate)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_Connect', 'EWTKLIB');
                    }
                });
        },
        Close: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Close)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_DisConnect', 'EWTKLIB');
                    }
                });
        },
        ClearError: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.ClearError)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_GetData', 'EWTKLIB');
                    }
                });
        },
        RequestStatus: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RequestStatus)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_RequestStatus', 'EWTKLIB');
                    }
                });
        },
        IssueCard: function (success, fail, position_str) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.IssueCard, '', '', position_str)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_Connect', 'EWTKLIB');
                    }
                });
        },
        MoveCard: function (success, fail, position_str) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.MoveCard, '', '', position_str)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_MoveCard', 'EWTKLIB');
                    }
                });
        },
        RomVersion: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RomVersion)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_RomVersion', 'EWTKLIB');
                    }
                });
        },
        CleanCard: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.CleanCard)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'HONEYWELLSCANNER_CleanCard', 'EWTKLIB');
                    }
                });
        }
    };

    // === RFID ===
    kiosk.API.Device.RFID = {
        DeviceAction: {
            RfidOpen: 0,
            RfidClose: 1,
            RfidGetVersion: 2,
            RfidStart: 3,
            RfidStop: 4,
            RfidSetAntenna: 5,
            RfidGetAntenna: 6
        },
        generuteParemater: function (action, com, antennaPort) {
            var cashBoxCmd = {
                comPort: com || 'COM6',
                antennaPort: antennaPort || '1'
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(cashBoxCmd),
                },
                cmd = {
                    "DeviceName": "RFID",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        RfidOpen: function (success, p1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidOpen, p1)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidClose: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidClose)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidGetVersion: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidGetVersion)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidStart: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidStart)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidStop: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidStop)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidSetAntenna: function (success, antennaPort) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidSetAntenna, undefined, antennaPort)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        },
        RfidGetAntenna: function (success) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.RfidGetAntenna)),
                function (res) {
                    var result = JSON.parse(res);
                    success(result);
                });
        }

    };
    // === RFID E N D ===

    // === MMM ===
    kiosk.API.Device.MMM = {
        DeviceAction: {
            GetData: 0,
            StopGet: 1
        },
        generuteParemater: function (action) {
            var DeviceCmd = {
                paperReq: ''
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "MMM",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        GetData: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.GetData)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'MMM_GetData', 'MMM');
                    }
                });
        },
        StopGet: function (success, fail) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.StopGet)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'MMM_StopGet', 'MMM');
                    }
                });
        }
    };

    // === WEBCAM ===
    kiosk.API.Device.WEBCAM = {
        DeviceAction: {
            Capture: 0,
            Setting: 1,
            StartRecord: 2,
            StopRecord: 3,
            Close: 4
        },
        generuteParemater: function (action, param1, param2, param3) {
            var DeviceCmd = {
                pixel: param1,
                picturePath: param2,
                deviceName: param3
            },
                actionCmd = {
                    Action: action,
                    Parameter: JSON.stringify(DeviceCmd)
                },
                cmd = {
                    "DeviceName": "WEBCAM",
                    "Worktype": "PostRequest",
                    "Paremater": JSON.stringify(actionCmd),
                    "ReponseModule": "UI",
                };
            return cmd;
        },
        Capture: function (success, fail, arg, arg1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Capture, undefined, arg, arg1)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'WEBCAN_Capture', 'WEBCAM');
                    }
                });
        },
        Setting: function (success, fail, arg, arg1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Setting, arg, undefined, arg1)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'WEBCAN_Setting', 'WEBCAM');
                    }
                });
        },
        StartRecord: function (success, fail, arg, arg1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.StartRecord, undefined, arg, arg1)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'WEBCAN_Setting', 'WEBCAM');
                    }
                });
        },
        StopRecord: function (success, fail, arg, arg1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.StopRecord, undefined, undefined, arg1)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'WEBCAN_Setting', 'WEBCAM');
                    }
                });
        },
        Close: function (success, fail, arg, arg1) {
            kiosk.API.Device.postToDeviceWithCallback(
                JSON.stringify(this.generuteParemater(this.DeviceAction.Close, undefined, undefined, arg1)),
                function (res) {
                    var result = JSON.parse(res);
                    if (result.IsSuccess) {
                        success(result);
                    }
                    else {
                        success(result);
                        kiosk.API.log.logError(res, 'WEBCAN_Setting', 'WEBCAM');
                    }
                });
        }
    };
    // =======================
})();