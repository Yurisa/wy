
/*
* Title                   : Booking Calendar PRO (jQuery Plugin)
* Version                 : 1.2
* File                    : jquery.dop.BackendBookingCalendarPRO.js
* File Version            : 1.2
* Created / Last Modified : 20 May 2013
* Author                  : Dot on Paper
* Copyright               : © 2011 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Booking Calendar PRO Back End jQuery plugin.
*/

(function($){
    $.fn.DOPBackendBookingCalendarPRO = function(options){
        var Data = {'AddtMonthViewText': 'Add Month View', // Add Month View button title (plus icon).
                    'AvailableDays': [true, true, true, true, true, true, true], // Set available/unavailable days starting with Monday.
                    'AvailableLabel': 'No. Available', // Form label for Number of Available Items.
                    'AvailableOneText': 'available', // Available Day text for one item.
                    'AvailableText': 'available', // Available text for more items.
                    'BookedText': 'booked', // Booked Day text.
                    'CloseLabel': '关闭', // Form label for Close button.
                    'Currency': '元', // Currency icon.
                    'DataURL': 'dopbcp/php-file/load.php', // URL from were JSON data is loaded.
                    'DateEndLabel': '结束时间', // Form label for End Date.
                    'DateStartLabel': '开始时间', // Form label for Start Date.
                    'DateType': 1, // Form date display type (1 = American, 2 = European)
                    'DayNames': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], // Weekdays long names.
                    'DayShortNames': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], // Weekdays short names.
                    'FirstDay': 1, // Set the first day of the week (1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday, 7 = Sunday)
                    'GroupDaysLabel': 'Group Days', // Form label for Group Days checkbox.
                    'ID': 0, // Calendar ID. Change it if you have more then one calendar. Make it the same as the Front End version.
                    'InfoLabel': 'Information (users will see this message)', // Form label for Information field.
                    'MonthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // Months long names.
                    'MonthShortNames': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months short names.
                    'NextMonthText': '下一月', // Next Month button title.
                    'NotesLabel': '备注', // Form label for Notes field.
                    'PreviousMonthText': 'Previous Month', // Previous Month button title.
                    'PriceLabel': '市场价', // Form label for Price Field.
                    'PromoLabel': '平台价', // Form label for Promo Price field.
                    'Reinitialize': false, // Reinitialize the calendar if already loaded.
                    'RemoveMonthViewText': 'Remove Month View', // Remove Month View button title (minus icon).
                    'ResetConfirmation': 'Are you sure you want to reset data?', // Form Reset Confirmation text.
                    'ResetLabel': '重置', // Form label for Reset Button.
                    'SaveURL': 'dopbcp/php-file/save.php', // URL to were JSON data is saved.
                    'StatusAvailableText': '日常', // Form Status - Available text.
                    'StatusBookedText': '高峰期', // Form Status - Booked text.
                    'StatusLabel': '状态', // Form label for Status Select field.
                    'StatusSpecialText': '特价', // Form Status - Special text.
                    'StatusUnavailableText': 'Unavailable', // Form Status - Unavailable text.
                    'SubmitLabel': '保存', // Form label for Submit Button.
                    'UnavailableText': 'unavailable'}, // Unavailable Day text.
        Container = this,

        Schedule = {},
		SendData = {},
        StartDate = new Date(),
        StartYear = StartDate.getFullYear(),
        StartMonth = StartDate.getMonth()+1,
        StartDay = StartDate.getDate(),
        CurrYear = StartYear,
        CurrMonth = StartMonth,

        AddtMonthViewText = 'Add Month View',
        AvailableDays = [true, true, true, true, true, true, true],
        AvailableLabel = 'No. Available',
        AvailableOneText = 'available',
        AvailableText = 'available',
        BookedText = 'booked',
        CloseLabel = 'Close',
        Currency = '元',
        DataURL = 'dopbcp/php-file/load.php',
        DateEndLabel = 'End Date',
        DateStartLabel = 'Start Date',
        DateType = 1,
        DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        DayShortNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        FirstDay = 1,
        GroupDaysLabel = 'Group Days',
        ID = 0,
        InfoLabel = 'Informations',
        MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        MonthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        NextMonthText = 'Next Month',
        NotesLabel = 'Notes',
        PreviousMonthText = 'Previous Month',
        PriceLabel = 'Price',
        PromoLabel = 'Promo',
        RemoveMonthViewText = 'Remove Month View',
        ResetConfirmation = 'Are you sure you want to reset all data?',
        ResetLabel = 'Reset',
        SaveURL = 'dopbcp/php-file/save.php',
        StatusAvailableText = 'Available',
        StatusBookedText = 'Booked',
        StatusLabel = 'Status',
        StatusSpecialText = 'Special',
        StatusUnavailableText = 'Unavailable',
        SubmitLabel = 'Submit',
        UnavailableText = 'unavailable',
        
        noMonths = 1,
        dayStartSelection,
        dayEndSelection,
        dayFirstSelected = false,
        dayTimeDisplay = false,
        dayStartSelectionCurrMonth,
        dayNo = 0,

        methods = {            
                    init:function( ){// Init Plugin.
                        return this.each(function(){
                            if (options){
                                $.extend(Data, options);
                            }
                            
                            if (!$(Container).hasClass('dopbcp-initialized') || Data['Reinitialize']){
                                $('#DOPBackendBookingCalendarPRO_Info'+ID).remove();
                                $(Container).addClass('dopbcp-initialized');
                                methods.parseData();
                                $(window).bind('resize.DOPBackendBookingCalendarPRO', methods.initRP);  
                            }
                        });
                    },
                    parseData:function(){
                        Container.html('<div class="DOPBackendBookingCalendarPRO_Container loader"></div>');
                        
                        AddtMonthViewText = Data['AddtMonthViewText'];
                        AvailableDays[0] = Data['AvailableDays'][0];
                        AvailableDays[1] = Data['AvailableDays'][1];
                        AvailableDays[2] = Data['AvailableDays'][2];
                        AvailableDays[3] = Data['AvailableDays'][3];
                        AvailableDays[4] = Data['AvailableDays'][4];
                        AvailableDays[5] = Data['AvailableDays'][5];
                        AvailableDays[6] = Data['AvailableDays'][6];
                        AvailableLabel = Data['AvailableLabel'];
                        AvailableOneText = Data['AvailableOneText'];
                        AvailableText = Data['AvailableText'];
                        BookedText = Data['BookedText'];
                        CloseLabel = Data['CloseLabel'];
                        Currency = Data['Currency'];
                        DataURL = prototypes.acaoBuster(Data['DataURL']);
                        DateEndLabel = Data['DateEndLabel'];
                        DateStartLabel = Data['DateStartLabel'];
                        DateType = Data['DateType'];
                        DayNames = Data['DayNames'];
                        DayShortNames = Data['DayShortNames'];
                        GroupDaysLabel = Data['GroupDaysLabel'];
                        FirstDay = Data['FirstDay'];
                        ID = Data['ID'];
                        InfoLabel = Data['InfoLabel'];
                        MonthNames = Data['MonthNames'];
                        MonthShortNames = Data['MonthShortNames'];
                        NextMonthText = Data['NextMonthText'];
                        NotesLabel = Data['NotesLabel'];
                        PreviousMonthText = Data['PreviousMonthText'];
                        PriceLabel = Data['PriceLabel'];
                        PromoLabel = Data['PromoLabel'];
                        RemoveMonthViewText = Data['RemoveMonthViewText'];
                        ResetConfirmation = Data['ResetConfirmation'];
                        ResetLabel = Data['ResetLabel'];
                        SaveURL = prototypes.acaoBuster(Data['SaveURL']);
                        StatusAvailableText = Data['StatusAvailableText'];
                        StatusBookedText = Data['StatusBookedText'];
                        StatusLabel = Data['StatusLabel'];
                        StatusSpecialText = Data['StatusSpecialText'];
                        StatusUnavailableText = Data['StatusUnavailableText'];
                        SubmitLabel = Data['SubmitLabel'];
                        UnavailableText = Data['UnavailableText'];
                        
                        methods.parseCalendarData();
                    },
                    parseCalendarData:function(){
                        $.post(DataURL, {dopbcp_calendar_id:ID}, function(data){
                            data = $.trim(data).replace(/\\/gi, '');
                            
                            if (data != ''){
                                Schedule = JSON.parse(data);
                            }
                            methods.initCalendar();
                        });
                    },

                    initCalendar:function(){// Init  Calendar
                        var HTML = new Array();
                        
                        HTML.push('<div class="DOPBackendBookingCalendarPRO_Container">');                        
                        HTML.push('    <div class="DOPBackendBookingCalendarPRO_Navigation">');
                        HTML.push('        <div class="month_year"></div>');
                        HTML.push('        <div class="week">');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <div class="day"></div>');
                        HTML.push('            <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('        </div>');
                        HTML.push('        <div class="add_btn" title="'+AddtMonthViewText+'"></div>');                        
                        HTML.push('        <div class="remove_btn" title="'+RemoveMonthViewText+'"></div>');
                        HTML.push('        <div class="previous_btn" title="'+PreviousMonthText+'"></div>');
                        HTML.push('        <div class="next_btn" title="'+NextMonthText+'"></div>');
                        HTML.push('    </div>');
                        HTML.push('    <div class="DOPBackendBookingCalendarPRO_Calendar"></div>');
                        HTML.push('    <div class="DOPBackendBookingCalendarPRO_FormWrapper">');
                        HTML.push('        <div class="DOPBackendBookingCalendarPRO_FormBackground"></div>');
                        HTML.push('        <div class="DOPBackendBookingCalendarPRO_FormContainer"></div>');
                        HTML.push('    </div>');
                        HTML.push('</div>');

                        Container.html(HTML.join(''));
                        $('body').append('<div class="DOPBackendBookingCalendarPRO_Info" id="DOPBackendBookingCalendarPRO_Info'+ID+'"></div>');
                        
                        methods.initSettings();
                    },
                    initSettings:function(){// Init  Settings
                        methods.initContainer();
                        methods.initNavigation();
                        methods.initInfo();
                        methods.generateCalendar(StartYear, StartMonth);
                    },
                    initRP:function(){
                        methods.rpContainer();
                        methods.rpNavigation();
                        methods.rpDays();
                    },
                    
                    initContainer:function(){// Init  Container
                        methods.rpContainer();
                    },
                    rpContainer:function(){// RP Container
                        var hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        $('.DOPBackendBookingCalendarPRO_Container', Container).width(Container.width());
                        
                        if (Container.width() <= 280){
                            $('.DOPBackendBookingCalendarPRO_Container .month_year', Container).html(MonthShortNames[(CurrMonth%12 != 0 ? CurrMonth%12:12)-1]+' '+CurrYear); 
                        }
                        else{
                            $('.DOPBackendBookingCalendarPRO_Container .month_year', Container).html(MonthNames[(CurrMonth%12 != 0 ? CurrMonth%12:12)-1]+' '+CurrYear); 
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    
                    initNavigation:function(){// Init Navigation
                        methods.rpNavigation();
                        
                        if (!prototypes.isTouchDevice()){
                            $('.DOPBackendBookingCalendarPRO_Navigation .previous_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBackendBookingCalendarPRO_Navigation .next_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBackendBookingCalendarPRO_Navigation .add_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });

                            $('.DOPBackendBookingCalendarPRO_Navigation .remove_btn', Container).hover(function(){
                                $(this).addClass('hover');
                            }, function(){
                                $(this).removeClass('hover');
                            });
                        }
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .previous_btn', Container).unbind('click');
                        $('.DOPBackendBookingCalendarPRO_Navigation .previous_btn', Container).bind('click', function(){                                                            
                            methods.generateCalendar(StartYear, CurrMonth-1);

                            if (CurrMonth == StartMonth){
                                $('.DOPBackendBookingCalendarPRO_Navigation .previous_btn', Container).css('display', 'none');
                            }
                        });
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .next_btn', Container).unbind('click');
                        $('.DOPBackendBookingCalendarPRO_Navigation .next_btn', Container).bind('click', function(){
                            methods.generateCalendar(StartYear, CurrMonth+1);
                            $('.DOPBackendBookingCalendarPRO_Navigation .previous_btn', Container).css('display', 'block');
                        });
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .add_btn', Container).unbind('click');
                        $('.DOPBackendBookingCalendarPRO_Navigation .add_btn', Container).bind('click', function(){
                            methods.hideForm();
                            noMonths++;
                            methods.generateCalendar(StartYear, CurrMonth);
                            $('.DOPBackendBookingCalendarPRO_Navigation .remove_btn', Container).css('display', 'block');
                        });
                        
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .remove_btn', Container).unbind('click');
                        $('.DOPBackendBookingCalendarPRO_Navigation .remove_btn', Container).bind('click', function(){
                            methods.hideForm();
                            noMonths--;
                            methods.generateCalendar(StartYear, CurrMonth);
                            
                            if(noMonths == 1){
                                $('.DOPBackendBookingCalendarPRO_Navigation .remove_btn', Container).css('display', 'none');
                            }
                        });
                    },
                    rpNavigation:function(){ // RP Navigation
                        var no = 0,
                        hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .week .day', Container).width(parseInt(($('.DOPBackendBookingCalendarPRO_Navigation .week', Container).width()-parseInt($('.DOPBackendBookingCalendarPRO_Navigation .week', Container).css('padding-left'))+parseInt($('.DOPBackendBookingCalendarPRO_Navigation .week', Container).css('padding-right')))/7));
                        
                        no = FirstDay-1;
                        
                        $('.DOPBackendBookingCalendarPRO_Navigation .week .day', Container).each(function(){
                            no++;
                            
                            if (no == 7){
                                no = 0;
                            }
                                
                            if ($(this).width() <= 70){
                                $(this).html(DayShortNames[no]);
                            }
                            else{
                                $(this).html(DayNames[no]);
                            }
                        });
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    
                    generateCalendar:function(year, month){// Init Calendar       
                        CurrYear = new Date(year, month, 0).getFullYear();
                        CurrMonth = month;    
                                                
                        $('.DOPBackendBookingCalendarPRO_Navigation .month_year', Container).html(MonthNames[(CurrMonth%12 != 0 ? CurrMonth%12:12)-1]+' '+CurrYear);                        
                        $('.DOPBackendBookingCalendarPRO_Calendar', Container).html('');                        
                        
                        for (var i=1; i<=noMonths; i++){
                            methods.initMonth(CurrYear, month = month%12 != 0 ? month%12:12, i);
                            month++;
                            
                            if (month % 12 == 1){
                                CurrYear++;
                                month = 1;
                            }                            
                        }
                    },
                    initMonth:function(year, month, position){// Init Month
                        var i, d, cyear, cmonth, cday, start, totalDays = 0,
                        noDays = new Date(year, month, 0).getDate(),
                        noDaysPreviousMonth = new Date(year, month-1, 0).getDate(),
                        firstDay = new Date(year, month-1, 2-FirstDay).getDay(),
                        lastDay = new Date(year, month-1, noDays-FirstDay+1).getDay(),
                        monthHTML = new Array(), 
                        day = methods.defaultDay();
                                 
                        dayNo = 0;
                        
                        monthHTML.push('<div class="DOPBackendBookingCalendarPRO_Month">');
                        
                        if (position > 1){
                            monthHTML.push('<div class="month_year">'+MonthNames[(month%12 != 0 ? month%12:12)-1]+' '+year+'</div>');
                        }
                                                
                        if (firstDay == 0){
                            start = 7;
                        }
                        else{
                            start = firstDay;
                        }
                        
                        for (i=start-1; i>=1; i--){
                            totalDays++;
                            
                            d = new Date(year, month-2, noDaysPreviousMonth-i+1);
                            cyear = d.getFullYear();
                            cmonth = prototypes.timeLongItem(d.getMonth()+1);
                            cday = prototypes.timeLongItem(d.getDate());
                            day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                            if (StartYear == year && StartMonth == month){
                                monthHTML.push(methods.initDay('past_day', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               '', '', '', '', '', '', 'none'));            
                            }
                            else{
                                monthHTML.push(methods.initDay('last_month'+(position>1 ?  ' mask':''), 
                                                               position>1 ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_last':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status'],
															   day['flmainValue'],day['fl1Value'],day['fl2Value'],day['fl3Value']));
                            }
                        }
						//, , fl1Value, fl2Value, fl3Value
                        
                        for (i=1; i<=noDays; i++){
                            totalDays++;
                            
                            d = new Date(year, month-1, i);
                            cyear = d.getFullYear();
                            cmonth = prototypes.timeLongItem(d.getMonth()+1);
                            cday = prototypes.timeLongItem(d.getDate());
                            day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                            if (StartYear == year && StartMonth == month && StartDay > d.getDate()){
                                monthHTML.push(methods.initDay('past_day', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               '', '', '', '', '', '', 'none'));    
                            }
                            else{
                                monthHTML.push(methods.initDay('curr_month', 
                                                               ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status'],
															   day['flmainValue'],day['fl1Value'],day['fl2Value'],day['fl3Value']));
                            }
                        }

                        if (totalDays+7 < 42){
                            for (i=1; i<=14-lastDay; i++){
                                d = new Date(year, month, i);
                                cyear = d.getFullYear();
                                cmonth = prototypes.timeLongItem(d.getMonth()+1);
                                cday = prototypes.timeLongItem(d.getDate());
                                day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                            
                                monthHTML.push(methods.initDay('next_month'+(position<noMonths ?  ' hide':''), 
                                                               position<noMonths ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status'],
															   day['flmainValue'],day['fl1Value'],day['fl2Value'],day['fl3Value']));
                            }
                        }
                        else{
                            for (i=1; i<=7-lastDay; i++){
                                d = new Date(year, month, i);
                                cyear = d.getFullYear();
                                cmonth = prototypes.timeLongItem(d.getMonth()+1);
                                cday = prototypes.timeLongItem(d.getDate());
                                day = Schedule[cyear+'-'+cmonth+'-'+cday] != undefined ? Schedule[cyear+'-'+cmonth+'-'+cday]:methods.defaultDay(methods.weekDay(cyear, cmonth, cday));
                                
                                monthHTML.push(methods.initDay('next_month'+(position<noMonths ?  ' hide':''), 
                                                               position<noMonths ? ID+'_'+cyear+'-'+cmonth+'-'+cday+'_next':ID+'_'+cyear+'-'+cmonth+'-'+cday, 
                                                               d.getDate(), 
                                                               day['available'], day['bind'], day['info'], day['notes'], day['price'], day['promo'], day['status'],
															   day['flmainValue'],day['fl1Value'],day['fl2Value'],day['fl3Value']));
                            }
                        }

                        monthHTML.push('    <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        monthHTML.push('</div>');
                        
                        $('.DOPBackendBookingCalendarPRO_Calendar', Container).append(monthHTML.join(''));
                        
                        methods.rpDays();                        
                        methods.initDayEvents();
                    },
					               
                    initDay:function(type, id, day, available, bind, info, notes, price, promo, status, flmainValue, fl1Value, fl2Value, fl3Value){// Init Day
                        var dayHTML = Array(),
                        contentLine1 = '&nbsp;', 
                        contentLine2 = '&nbsp;';
                        
                        dayNo++;

                        if (type != 'past_day'){
							

                            switch (status){
                                case 'available':
									contentLine3 = price+Currency;
									contentLine1 = promo+Currency;
									contentLine2 = '<span class="text">分销商：'+flmainValue+'元<br />1级：'+fl1Value+'元 <br />2级：'+fl2Value+'元 <br />3级：'+fl3Value+'元</span>';
                                    break;
                                case 'booked':
									contentLine3 = price+Currency;
									contentLine1 = promo+Currency;
									contentLine2 = '<span class="text">分销商：'+flmainValue+'元<br />1级：'+fl1Value+'元 <br />2级：'+fl2Value+'元 <br />3级：'+fl3Value+'元</span>';
                                    break;
                                case 'special':
									contentLine3 = price+Currency;
									contentLine1 = promo+Currency;
									contentLine2 = '<span class="text">分销商：'+flmainValue+'元<br />1级：'+fl1Value+'元 <br />2级：'+fl2Value+'元 <br />3级：'+fl3Value+'元</span>';
                                    break;
                                case 'unavailable':
									contentLine3 = price+Currency;
									contentLine1 = promo+Currency;
									contentLine2 = '<span class="text">分销商：'+flmainValue+'元<br />1级：'+fl1Value+'元 <br />2级：'+fl2Value+'元 <br />3级：'+fl3Value+'元</span>';
                                    break;
                            }
                        }
                        if (dayNo % 7 == 1){
                            type += ' first-column';
                        }
                        
                        if (dayNo % 7 == 0){
                            type += ' last-column';
                        }
                                                
                        dayHTML.push('<div class="DOPBackendBookingCalendarPRO_Day '+status+'" id="'+id+'">');
                        dayHTML.push('    <div class="bind-left'+(bind == 2 || bind == 3 ? '  enabled':'')+'">');
                        dayHTML.push('        <div class="header">&nbsp;</div>');
                        dayHTML.push('        <div class="content">&nbsp;</div>');
                        dayHTML.push('    </div>');                        
                        dayHTML.push('    <div class="bind-content group'+bind+'">');
                        dayHTML.push('        <div class="header">');
                        dayHTML.push('            <div class="day">'+day+'</div>');
                        
                        if (notes != '' && type != 'past_day' && (bind == 0 || bind == 3)){
                            dayHTML.push('            <div class="notes" id="'+id+'_notes"></div>');
                        }   
                        
/*                        if (info != '' && type != 'past_day' && (bind == 0 || bind == 3)){
                            dayHTML.push('            <div class="info" id="'+id+'_info"></div>');
                        }                     
*/                        dayHTML.push('            <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        dayHTML.push('        </div>');
                        dayHTML.push('        <div class="content">');
                        dayHTML.push('            <div class="price">'+contentLine1+'</div>');
                        
                        if (promo > 0){
                            dayHTML.push('            <div class="old-price">'+contentLine3+'</div>');
                        }
                        dayHTML.push('            <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        dayHTML.push('            <div class="available">'+contentLine2+'</div>');
                        dayHTML.push('        </div>');  
                        dayHTML.push('    </div>');
                        dayHTML.push('    <div class="bind-right'+(bind == 1 || bind == 2 ? '  enabled':'')+'">');
                        dayHTML.push('        <div class="header">&nbsp;</div>');
                        dayHTML.push('        <div class="content">&nbsp;</div>');
                        dayHTML.push('    </div>');
                        dayHTML.push('</div>');
                        
                        return dayHTML.join('');
                    },                    
                    defaultDay:function(day){
                        return {"available": "",
                                "bind": "0",
                                "info": "",
                                "notes": "",
                                "price": "", 
                                "promo": "",
                                "status": AvailableDays[day] ? "none":"unavailable"}
                    },  
                    rpDays:function(){
                        var maxHeight = 0,
                        hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        $('.DOPBackendBookingCalendarPRO_Day .content', Container).removeAttr('style');
                       
                        $('.DOPBackendBookingCalendarPRO_Day', Container).width(parseInt(($('.DOPBackendBookingCalendarPRO_Month', Container).width()-parseInt($('.DOPBackendBookingCalendarPRO_Month', Container).css('padding-left'))+parseInt($('.DOPBackendBookingCalendarPRO_Month', Container).css('padding-right')))/7));
                        $('.DOPBackendBookingCalendarPRO_Day .bind-content', Container).width($('.DOPBackendBookingCalendarPRO_Day', Container).width()-2);
                      
                        if ($('.DOPBackendBookingCalendarPRO_Day', Container).width() <= 70){
                            $('.DOPBackendBookingCalendarPRO_Day .no-available-text', Container).css('display', 'none');
                        }
                        else{
                            $('.DOPBackendBookingCalendarPRO_Day .no-available-text', Container).css('display', 'inline');
                        }
                        
                        if ($('.DOPBackendBookingCalendarPRO_Day', Container).width() <= 50){
                            $('.DOPBackendBookingCalendarPRO_Day .bind-content .header .info', Container).css('display', 'none');
                            $('.DOPBackendBookingCalendarPRO_Day .bind-content .header .notes', Container).css('display', 'none');
                        }
                        else{
                            $('.DOPBackendBookingCalendarPRO_Day .bind-content .header .info', Container).css('display', 'block');
                            $('.DOPBackendBookingCalendarPRO_Day .bind-content .header .notes', Container).css('display', 'block');
                        }
                        
                        $('.DOPBackendBookingCalendarPRO_Day .bind-content .content', Container).each(function(){
                            if (maxHeight < $(this).height()){
                                maxHeight = $(this).height();
                            }
                        });
                        
                        $('.DOPBackendBookingCalendarPRO_Day .content', Container).height(maxHeight);
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },                          
                    initDayEvents:function(){// Init Events for the days of the Calendar.
                        var xPos = 0, yPos = 0, touch;
                        
                        $('.DOPBackendBookingCalendarPRO_Day', Container).unbind('click');
                        $('.DOPBackendBookingCalendarPRO_Day', Container).bind('click', function(){
                            var day = $(this);
                                
                            setTimeout(function(){
                                if (!dayTimeDisplay){
                                    if (!day.hasClass('mask')){
                                        if (!day.hasClass('past_day')){
                                            if (!dayFirstSelected){
                                                dayFirstSelected = true;
                                                dayStartSelection = day.attr('id');
                                                dayStartSelectionCurrMonth = CurrMonth;
                                                methods.hideForm();
                                            }
                                            else{
                                                dayFirstSelected = false;
                                                dayEndSelection = day.attr('id');
                                                methods.showForm();
                                            }
                                            methods.showDaySelection(day.attr('id'));
                                        }
                                    }
                                }
                                else{
                                    dayTimeDisplay = false;
                                }
                            }, 10);
                        });
                        
                        if (!prototypes.isTouchDevice()){
                            $('.DOPBackendBookingCalendarPRO_Day', Container).hover(function(){
                                var day = $(this);

                                if (dayFirstSelected){
                                    methods.showDaySelection(day.attr('id'));
                                }
                            });
                        
                            $('.DOPBackendBookingCalendarPRO_Day .info', Container).hover(function(){
                                $(this).addClass('hover');
                                methods.showInfo($(this).attr('id').split('_')[1], 'info');
                            }, function(){
                                $(this).removeClass('hover');
                                methods.hideInfo();
                            });
                        
                            $('.DOPBackendBookingCalendarPRO_Day .notes', Container).hover(function(){
                                $(this).addClass('hover');
                                methods.showInfo($(this).attr('id').split('_')[1], 'notes');
                            }, function(){
                                $(this).removeClass('hover');
                                methods.hideInfo();
                            });
                        }
                        else{
                            $('.DOPBackendBookingCalendarPRO_Day .info', Container).unbind('touchstart');
                            $('.DOPBackendBookingCalendarPRO_Day .info', Container).bind('touchstart', function(e){
                                e.preventDefault();
                                touch = e.originalEvent.touches[0];
                                xPos = touch.clientX+$(document).scrollLeft();
                                yPos = touch.clientY+$(document).scrollTop();
                                $('#DOPBackendBookingCalendarPRO_Info'+ID).css({'left': xPos, 'top': yPos});
                                methods.showInfo($(this).attr('id').split('_')[1], 'info');
                            });
                            
                            $('.DOPBackendBookingCalendarPRO_Day .notes', Container).unbind('touchstart');
                            $('.DOPBackendBookingCalendarPRO_Day .notes', Container).bind('touchstart', function(e){
                                e.preventDefault();
                                touch = e.originalEvent.touches[0];
                                xPos = touch.clientX+$(document).scrollLeft();
                                yPos = touch.clientY+$(document).scrollTop();
                                $('#DOPBackendBookingCalendarPRO_Info'+ID).css({'left': xPos, 'top': yPos});
                                methods.showInfo($(this).attr('id').split('_')[1], 'notes');
                            });
                        }
                    },
                    showDaySelection:function(id){
                        var day, maxHeight = 0;
                        
                        $('.DOPBackendBookingCalendarPRO_Day', Container).removeClass('selected');
                        methods.rpDays();
                        
                        if (id < dayStartSelection){
                            $('.DOPBackendBookingCalendarPRO_Day', Container).each(function(){
                               day = $(this);
                               
                               if (day.attr('id') >= id && day.attr('id') <= dayStartSelection && !day.hasClass('past_day') && !day.hasClass('hide') && !day.hasClass('mask')){
                                   day.addClass('selected');
                               }
                            });
                        }
                        else{
                            $('.DOPBackendBookingCalendarPRO_Day', Container).each(function(){
                               day = $(this);   
                               
                               if (day.attr('id') >= dayStartSelection && day.attr('id') <= id && !day.hasClass('past_day') && !day.hasClass('hide') && !day.hasClass('mask')){
                                   day.addClass('selected');
                               }
                            });
                        }
                        
                        $('.DOPBackendBookingCalendarPRO_Day.selected .header', Container).removeAttr('style');
                        $('.DOPBackendBookingCalendarPRO_Day.selected .content', Container).removeAttr('style');
                        
                        $('.DOPBackendBookingCalendarPRO_Day .content', Container).each(function(){
                            if (maxHeight < $(this).height()){
                                maxHeight = $(this).height();
                            }
                        });
                        
                        $('.DOPBackendBookingCalendarPRO_Day .content', Container).height(maxHeight);
                    },
                    
                    initInfo:function(){
                        var xPos = 0, yPos = 0;
                        
                        if (!prototypes.isTouchDevice()){
                            $(document).mousemove(function(e){
                                xPos = e.pageX+30;
                                yPos = e.pageY;

                                if ($(document).scrollTop()+$(window).height() < yPos+$('#DOPBackendBookingCalendarPRO_Info'+ID).height()+parseInt($('#DOPBackendBookingCalendarPRO_Info'+ID).css('padding-top'))+parseInt($('#DOPBackendBookingCalendarPRO_Info'+ID).css('padding-bottom'))+10){
                                   yPos = $(document).scrollTop()+$(window).height()-$('#DOPBackendBookingCalendarPRO_Info'+ID).height()-parseInt($('#DOPBackendBookingCalendarPRO_Info'+ID).css('padding-top'))-parseInt($('#DOPBackendBookingCalendarPRO_Info'+ID).css('padding-bottom'))-10;
                                }

                                $('#DOPBackendBookingCalendarPRO_Info'+ID).css({'left': xPos, 'top': yPos});
                            }); 
                        }
                        else{
                            $('#DOPBackendBookingCalendarPRO_Info'+ID).unbind('touchstart');
                            $('#DOPBackendBookingCalendarPRO_Info'+ID).bind('touchstart', function(e){
                                e.preventDefault();
                                methods.hideInfo();
                            });
                        }
                    },
                    showInfo:function(date, type){
                        var info = Schedule[date][type];
                        
                        $('#DOPBackendBookingCalendarPRO_Info'+ID).html(info);
                        $('#DOPBackendBookingCalendarPRO_Info'+ID).css('display', 'block');                         
                    },
                    hideInfo:function(){
                        $('#DOPBackendBookingCalendarPRO_Info'+ID).css('display', 'none');                        
                    },
                    
                    showForm:function(){// Show Form
                        var HTML = new Array(),
                        startDate, sYear, sMonth, sMonthText, sDay,
                        endDate, eYear, eMonth, eMonthText, eDay;
                        
                        HTML.push('<div class="DOPBackendBookingCalendarPRO_Form">');
                        HTML.push('    <div class="container">');
                         
                        // ***************************************************** Start Dates Info
                        HTML.push('        <div class="section first">');
                        
                        if (dayStartSelection > dayEndSelection){
                            endDate = dayStartSelection.split('_')[1];
                            startDate = dayEndSelection.split('_')[1];
                        }
                        else{
                            startDate = dayStartSelection.split('_')[1];
                            endDate = dayEndSelection.split('_')[1];
                        }

                        sYear = startDate.split('-')[0];
                        sMonth = startDate.split('-')[1];
                        sMonthText = MonthNames[parseInt(sMonth, 10)-1];
                        sDay = startDate.split('-')[2];

                        eYear = endDate.split('-')[0];
                        eMonth = endDate.split('-')[1];
                        eMonthText = MonthNames[parseInt(eMonth, 10)-1];
                        eDay = endDate.split('-')[2];
                        
                        if (dayStartSelection != dayEndSelection){
                            if (DateType == 1){
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+DateStartLabel+'</label>');
                                HTML.push('                <span class="date">'+sMonthText+' '+sDay+', '+sYear+'</span>');
                                HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');  
                                HTML.push('            </div>');
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+DateEndLabel+'</label>');
                                HTML.push('                <span class="date">'+eMonthText+' '+eDay+', '+eYear+'</span>');
                                HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');  
                                HTML.push('            </div>');
                            }
                            else{
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+DateStartLabel+'</label>');
                                HTML.push('                <span class="date">'+sDay+' '+sMonthText+' '+sYear+'</span>');
                                HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');  
                                HTML.push('            </div>');
                                HTML.push('            <div class="section-item">');
                                HTML.push('                <label class="left">'+DateEndLabel+'</label>');
                                HTML.push('                <span class="date">'+eDay+' '+eMonthText+' '+eYear+'</span>');
                                HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');  
                                HTML.push('            </div>');
                            }
                        }
                        else{      
                            HTML.push('            <div class="section-item">');                      
                            HTML.push('                <span class="date">'+(DateType == 1 ? sMonthText+' '+sDay+', '+sYear:sDay+' '+sMonthText+' '+sYear)+'</span>');
                            HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');  
                            HTML.push('            </div>');
                        }
                        HTML.push('        </div>');
                        // ***************************************************** End Dates Info
                        
                        // ***************************************************** Start Form Fields
                        HTML.push('        <div class="section">');
                        HTML.push('            <div class="section-item">');  
                        HTML.push('                <label class="type2" for="DOPBCP_status">'+StatusLabel+'</label>');
                        HTML.push('                <select name="DOPBCP_status" id="DOPBCP_status">');
                        HTML.push('                    <option value="available">'+StatusAvailableText+'</option>');
                        HTML.push('                    <option value="booked">'+StatusBookedText+'</option>');
                        HTML.push('                    <option value="special">'+StatusSpecialText+'</option>');
                        //HTML.push('                    <option value="unavailable">'+StatusUnavailableText+'</option>');
                        HTML.push('                </select>');
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');     
                        
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_price">'+PriceLabel+'</label>');
                        HTML.push('                <input type="text" name="DOPBCP_price" id="DOPBCP_price" value="" /><span class="currency">'+Currency+'</span>');
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');                        
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_promo">'+PromoLabel+'</label>');
                        HTML.push('                <input type="text" name="DOPBCP_promo" id="DOPBCP_promo" value=""  /><span class="currency">'+Currency+'</span>'); 
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');

                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_fl_main">经销商提成</label>');
                        HTML.push('                <input type="text" name="DOPBCP_fl_main" id="DOPBCP_fl_main" value=""  /><span class="currency">'+Currency+'</span>'); 
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');  
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_notes">1级提成</label>');
                        HTML.push('                <input type="text" name="DOPBCP_fl1" id="DOPBCP_fl1" value=""  /><span class="currency">'+Currency+'</span>'); 
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');  
						
						HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_fl2">2级提成</label>');
                        HTML.push('                <input type="text" name="DOPBCP_fl2" id="DOPBCP_fl2" value=""  /><span class="currency">'+Currency+'</span>'); 
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>'); 
						 
						HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type2" for="DOPBCP_fl3">3级提成</label>');
                        HTML.push('                <input type="text" name="DOPBCP_fl3" id="DOPBCP_fl3" value=""  /><span class="currency">'+Currency+'</span>'); 
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('            </div>');  
												
                        HTML.push('            <div class="section-item">');
                        HTML.push('                <label class="type4" for="DOPBCP_notes">'+NotesLabel+'</label>');
                        HTML.push('                <textarea name="DOPBCP_notes" id="DOPBCP_notes"></textarea>'); 
                        HTML.push('            </div>');  											
						                       
                        /*HTML.push('            <div class="section-item">');
                        HTML.push('                <input type="checkbox" name="DOPBCP_group" id="DOPBCP_group" />');
                        HTML.push('                <label class="type5" for="DOPBCP_group">'+GroupDaysLabel+'</label>');
                        HTML.push('            </div>');  */ 
                        
                        HTML.push('        </div>');
                        // ***************************************************** End Form Fields
                        
                        HTML.push('        <div class="section">');
                        HTML.push('            <input type="button" name="DOPBCP_submit" id="DOPBCP_submit" class="submit-style" title="'+SubmitLabel+'" value="'+SubmitLabel+'" />');
                        //HTML.push('            <input type="button" name="DOPBCP_reset" id="DOPBCP_reset" class="submit-style" title="'+ResetLabel+'" value="'+ResetLabel+'" />');
                        HTML.push('            <input type="button" name="DOPBCP_close" id="DOPBCP_close" class="submit-style" title="'+CloseLabel+'" value="'+CloseLabel+'" />');
                        HTML.push('                <br class="DOPBackendBookingCalendarPRO_Clear" />');
                        HTML.push('        </div>');
                        
                        HTML.push('    </div>');                      
                        HTML.push('</div>');
                        
                        methods.rpForm();
                        
                        $('.DOPBackendBookingCalendarPRO_FormContainer', Container).html(HTML.join(''));
                        $('.DOPBackendBookingCalendarPRO_FormWrapper', Container).css('display', 'block');

                        // ----------------------------------------------------- Start Form Actions
                        $('#DOPBCP_status').unbind('change');
                        $('#DOPBCP_status').bind('change', function(){
                            switch ($(this).val()){
                                case 'available':
                                    break;
                                case 'booked':
                                    break;
                                case 'special':
                                    break;
                                case 'unavailable':
                                    break;
                            }
                        });
                        
                        $('#DOPBCP_price').unbind('keyup');
                        $('#DOPBCP_price').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });

                        $('#DOPBCP_promo').unbind('keyup');
                        $('#DOPBCP_promo').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });
						
                        $('#DOPBCP_fl_main').unbind('keyup');
                        $('#DOPBCP_fl_main').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });
                        $('#DOPBCP_fl1').unbind('keyup');
                        $('#DOPBCP_fl1').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });
                        $('#DOPBCP_fl2').unbind('keyup');
                        $('#DOPBCP_fl2').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });
                        $('#DOPBCP_fl3').unbind('keyup');
                        $('#DOPBCP_fl3').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789.', '', '');
                        });
                                                
                        $('#DOPBCP_available').unbind('keyup');
                        $('#DOPBCP_available').bind('keyup', function(){
                            prototypes.cleanInput(this, '0123456789', '', '');
                        });

                        $('#DOPBCP_submit').unbind('click');
                        $('#DOPBCP_submit').bind('click', function(){
                            methods.setData();
                        });
                        
                        $('#DOPBCP_reset').unbind('click');
                        $('#DOPBCP_reset').bind('click', function(){
                            methods.resetData();
                        });
                        
                        $('#DOPBCP_close').unbind('click');
                        $('#DOPBCP_close').bind('click', function(){
                            methods.hideForm();
                        });
                        // ----------------------------------------------------- End Form Actions
                        
                        $('body').animate({scrollTop: $(Container).offset().top-100}, 'slow');
                    },
                    hideForm:function(){
                        $('.DOPBackendBookingCalendarPRO_FormWrapper', Container).css('display', 'none');
                        $('.DOPBackendBookingCalendarPRO_Day', Container).removeClass('selected');   
                        methods.rpDays();
                    },
                    rpForm:function(){
                        $('.DOPBackendBookingCalendarPRO_FormBackground', Container).height($(Container).height());
                        $('.DOPBackendBookingCalendarPRO_FormBackground', Container).width($(Container).width());
                    },
            
                    setData:function(){// Set submited data.
                        var y, m, d, noDays, key,
                        startDate, sYear, sMonth, sDay,
                        endDate, eYear, eMonth, eDay,
                        fromMonth, toMonth, fromDay, toDay,
                        availableValue = $('#DOPBCP_available').val(),
                        bindValue = 0,
                        //infoValue = $('#DOPBCP_info').val().replace(/\n/gi, '<br />'),
                        notesValue = $('#DOPBCP_notes').val().replace(/\n/gi, '<br />'),
                        priceValue = $('#DOPBCP_price').val() != undefined ? $('#DOPBCP_price').val():'',
                        promoValue = $('#DOPBCP_promo').val() != undefined ? $('#DOPBCP_promo').val():'',
						
						flmainValue = $('#DOPBCP_fl_main').val() != undefined ? $('#DOPBCP_fl_main').val():'',
						fl1Value = $('#DOPBCP_fl1').val() != undefined ? $('#DOPBCP_fl1').val():'',
						fl2Value = $('#DOPBCP_fl2').val() != undefined ? $('#DOPBCP_fl2').val():'',
						fl3Value = $('#DOPBCP_fl3').val() != undefined ? $('#DOPBCP_fl3').val():'',
						
                        statusValue = $('#DOPBCP_status').val();
                                            
                        startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1];
                        endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                        sYear = parseInt(startDate.split('-')[0], 10);
                        sMonth = parseInt(startDate.split('-')[1], 10);
                        sDay = parseInt(startDate.split('-')[2], 10);

                        eYear = parseInt(endDate.split('-')[0], 10);
                        eMonth = parseInt(endDate.split('-')[1], 10);
                        eDay = parseInt(endDate.split('-')[2], 10);
						
                        if (Schedule[methods.previousDay(startDate)] != undefined){
                            if (Schedule[methods.previousDay(startDate)]['bind'] == 1){
                                Schedule[methods.previousDay(startDate)]['bind'] = 0;                                                                
                            }
                            else if (Schedule[methods.previousDay(startDate)]['bind'] == 2){
                                Schedule[methods.previousDay(startDate)]['bind'] = 3;                                
                            }
                        }
                        
                        if (Schedule[methods.nextDay(endDate)] != undefined){
                            if (Schedule[methods.nextDay(endDate)]['bind'] == 2){
                                Schedule[methods.nextDay(endDate)]['bind'] = 1;                                                                
                            }
                            else if (Schedule[methods.nextDay(endDate)]['bind'] == 3){
                                Schedule[methods.nextDay(endDate)]['bind'] = 0;                                
                            }
                        }

                        for (y=sYear; y<=eYear; y++){
                            fromMonth = 1;

                            if (y == sYear){
                                fromMonth = sMonth;
                            }

                            toMonth = 12;

                            if (y == eYear){
                                toMonth = eMonth;
                            }

                            for (m=fromMonth; m<=toMonth; m++){
                                noDays = new Date(y, m, 0).getDate();
                                fromDay = 1;

                                if (y == sYear && m == sMonth){
                                    fromDay = sDay;
                                }

                                toDay = noDays;

                                if (y == eYear && m == eMonth){
                                    toDay = eDay;
                                }

                                for (d=fromDay; d<=toDay; d++){
                                    key = y+'-'+prototypes.timeLongItem(m)+'-'+prototypes.timeLongItem(d);
									SendData[key] = {
													//"available": availableValue,
                                                     //"bind": bindValue,
                                                     //"info": infoValue,
                                                     "notes": notesValue,
                                                     "price": priceValue,
                                                     "promo": promoValue,
                                                     "flmainValue": flmainValue,
                                                     "fl1Value": fl1Value,
                                                     "fl2Value": fl2Value,
                                                     "fl3Value": fl3Value,
                                                     "status": statusValue};
                                    Schedule[key] = {
													//"available": availableValue,
                                                     //"bind": bindValue,
                                                     //"info": infoValue,
                                                     "notes": notesValue,
                                                     "price": priceValue,
                                                     "promo": promoValue,
                                                     "flmainValue": flmainValue,
                                                     "fl1Value": fl1Value,
                                                     "fl2Value": fl2Value,
                                                     "fl3Value": fl3Value,
                                                     "status": statusValue};
                                }
                            }
                        } 
                        methods.saveData();
                    },  
                    saveData:function(){// Save data.
                        var today = new Date(),
                        dd = prototypes.timeLongItem(today.getDate()),
                        mm = prototypes.timeLongItem(today.getMonth()+1),
                        yyyy = today.getFullYear();
                        
                        for (var day in Schedule){
                            if (day < yyyy+'-'+mm+'-'+dd){
                                delete Schedule[day];
                            }                            
                        }
                        
                        methods.hideForm();
                        methods.generateCalendar(StartYear, dayStartSelectionCurrMonth);
                            
                        $.post(SaveURL, {dopbcp_calendar_id:ID, dopbcp_schedule:JSON.stringify(SendData)}, function(data){});
						SendData = {};
                    },           
                    resetData:function(){// Reset Selected days.
                        if (confirm(ResetConfirmation)){
                            var startDate = dayStartSelection < dayEndSelection ? dayStartSelection.split('_')[1]:dayEndSelection.split('_')[1],
                            endDate = dayStartSelection < dayEndSelection ? dayEndSelection.split('_')[1]:dayStartSelection.split('_')[1];

                            for (var day in Schedule){
                                if (startDate <= day && day <= endDate){
                                    delete Schedule[day];
                                }                            
                            }
                            
                            methods.saveData();
                        }
                    },  
                                        
                    previousDay:function(date){
                        var previousDay = new Date(),
                        parts = date.split('-');
                        
                        previousDay.setFullYear(parts[0], parseInt(parts[1])-1, parts[2]);
                        previousDay.setTime(previousDay.getTime()-86400000);
                                                
                        return previousDay.getFullYear()+'-'+prototypes.timeLongItem(previousDay.getMonth()+1)+'-'+prototypes.timeLongItem(previousDay.getDate());                        
                    },
                    nextDay:function(date){
                        var nextDay = new Date(),
                        parts = date.split('-');
                        
                        nextDay.setFullYear(parts[0], parts[1]-1, parts[2]);
                        nextDay.setTime(nextDay.getTime()+86400000);
                           
                        return nextDay.getFullYear()+'-'+prototypes.timeLongItem(nextDay.getMonth()+1)+'-'+prototypes.timeLongItem(nextDay.getDate());
                    },
                    weekDay:function(year, month, day){
                        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        date = new Date(eval('"'+day+' '+months[parseInt(month, 10)-1]+', '+year+'"'));
                        
                        return date.getDay();
                    }
                  },



        prototypes = {
                        resizeItem:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item is 100% visible)
                            var currW = 0, currH = 0;

                            if (dw <= cw && dh <= ch){
                                currW = dw;
                                currH = dh;
                            }
                            else{
                                currH = ch;
                                currW = (dw*ch)/dh;

                                if (currW > cw){
                                    currW = cw;
                                    currH = (dh*cw)/dw;
                                }
                            }

                            child.width(currW);
                            child.height(currH);
                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },
                        resizeItem2:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item covers all the container)
                            var currW = 0, currH = 0;

                            currH = ch;
                            currW = (dw*ch)/dh;

                            if (currW < cw){
                                currW = cw;
                                currH = (dh*cw)/dw;
                            }

                            child.width(currW);
                            child.height(currH);

                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },

                        topItem:function(parent, child, ch){// Position item on Top
                            parent.height(ch);
                            child.css('margin-top', 0);
                        },
                        bottomItem:function(parent, child, ch){// Position item on Bottom
                            parent.height(ch);
                            child.css('margin-top', ch-child.height());
                        },
                        leftItem:function(parent, child, cw){// Position item on Left
                            parent.width(cw);
                            child.css('margin-left', 0);
                        },
                        rightItem:function(parent, child, cw){// Position item on Right
                            parent.width(cw);
                            child.css('margin-left', parent.width()-child.width());
                        },
                        hCenterItem:function(parent, child, cw){// Position item on Horizontal Center
                            parent.width(cw);
                            child.css('margin-left', (cw-child.width())/2);
                        },
                        vCenterItem:function(parent, child, ch){// Position item on Vertical Center
                            parent.height(ch);
                            child.css('margin-top', (ch-child.height())/2);
                        },
                        centerItem:function(parent, child, cw, ch){// Position item on Center
                            prototypes.hCenterItem(parent, child, cw);
                            prototypes.vCenterItem(parent, child, ch);
                        },
                        tlItem:function(parent, child, cw, ch){// Position item on Top-Left
                            prototypes.topItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        tcItem:function(parent, child, cw, ch){// Position item on Top-Center
                            prototypes.topItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        trItem:function(parent, child, cw, ch){// Position item on Top-Right
                            prototypes.topItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        mlItem:function(parent, child, cw, ch){// Position item on Middle-Left
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        mrItem:function(parent, child, cw, ch){// Position item on Middle-Right
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        blItem:function(parent, child, cw, ch){// Position item on Bottom-Left
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        bcItem:function(parent, child, cw, ch){// Position item on Bottom-Center
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        brItem:function(parent, child, cw, ch){// Position item on Bottom-Right
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        
                        touchNavigation:function(parent, child){// One finger navigation for touchscreen devices
                            var prevX, prevY, currX, currY, touch, childX, childY;
                            
                            parent.bind('touchstart', function(e){
                                touch = e.originalEvent.touches[0];
                                prevX = touch.clientX;
                                prevY = touch.clientY;
                            });

                            parent.bind('touchmove', function(e){                                
                                touch = e.originalEvent.touches[0];
                                currX = touch.clientX;
                                currY = touch.clientY;
                                childX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                                childY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                                if (childX < (-1)*(child.width()-parent.width())){
                                    childX = (-1)*(child.width()-parent.width());
                                }
                                else if (childX > 0){
                                    childX = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                if (childY < (-1)*(child.height()-parent.height())){
                                    childY = (-1)*(child.height()-parent.height());
                                }
                                else if (childY > 0){
                                    childY = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                prevX = currX;
                                prevY = currY;

                                if (parent.width() < child.width()){
                                    child.css('margin-left', childX);
                                }
                                
                                if (parent.height() < child.height()){
                                    child.css('margin-top', childY);
                                }
                            });

                            parent.bind('touchend', function(e){
                                if (!prototypes.isChromeMobileBrowser()){
                                    e.preventDefault();
                                }
                            });
                        },

			rgb2hex:function(rgb){// Convert RGB color to HEX
                            var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                            return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
                                   (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
                                   (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
			},
			idealTextColor:function(bgColor){// Set text color depending on the background color
			    var rgb = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(bgColor);
    
			    if (rgb != null){
			        return parseInt(rgb[1], 10)+parseInt(rgb[2], 10)+parseInt(rgb[3], 10) < 3*256/2 ? 'white' : 'black';
			    }
			    else{
			        return parseInt(bgColor.substring(0, 2), 16)+parseInt(bgColor.substring(2, 4), 16)+parseInt(bgColor.substring(4, 6), 16) < 3*256/2 ? 'white' : 'black';
			    }
			},

                        dateDiference:function(date1, date2){// Diference between 2 dates
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return parseInt(diff/(one_day))+1;
                        },
                        noDays:function(date1, date2){// Returns no of days between 2 days
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return Math.round(diff/(one_day))+1;
                        },
                        timeLongItem:function(item){// Return day/month with 0 in front if smaller then 10
                            if (item < 10){
                                return '0'+item;
                            }
                            else{
                                return item;
                            }
                        },
                        timeToAMPM:function(item){// Returns time in AM/PM format
                            var hour = parseInt(item.split(':')[0], 10),
                            minutes = item.split(':')[1],
                            result = '';
                            
                            if (hour == 0){
                                result = '12';
                            }
                            else if (hour > 12){
                                result = prototypes.timeLongItem(hour-12);
                            }
                            else{
                                result = prototypes.timeLongItem(hour);
                            }
                            
                            result += ':'+minutes+' '+(hour < 12 ? 'AM':'PM');
                            
                            return result;
                        },

                        stripslashes:function(str){// Remove slashes from string
                            return (str + '').replace(/\\(.?)/g, function (s, n1) {
                                switch (n1){
                                    case '\\':
                                        return '\\';
                                    case '0':
                                        return '\u0000';
                                    case '':
                                        return '';
                                    default:
                                        return n1;
                                }
                            });
                        },
                        
                        randomize:function(theArray){// Randomize the items of an array
                            theArray.sort(function(){
                                return 0.5-Math.random();
                            });
                            return theArray;
                        },
                        randomString:function(string_length){// Create a string with random elements
                            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                            random_string = '';

                            for (var i=0; i<string_length; i++){
                                var rnum = Math.floor(Math.random()*chars.length);
                                random_string += chars.substring(rnum,rnum+1);
                            }
                            return random_string;
                        },

                        isIE8Browser:function(){// Detect the browser IE8
                            var isIE8 = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie 8') != -1){
                                isIE8 = true;
                            }
                            return isIE8;
                        },
                        isIEBrowser:function(){// Detect the browser IE
                            var isIE = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie') != -1){
                                isIE = true;
                            }
                            return isIE;
                        },
                        isChromeMobileBrowser:function(){// Detect the browser Mobile Chrome
                            var isChromeMobile = false,
                            agent = navigator.userAgent.toLowerCase();
                            
                            if ((agent.indexOf('chrome') != -1 || agent.indexOf('crios') != -1) && prototypes.isTouchDevice()){
                                isChromeMobile = true;
                            }
                            return isChromeMobile;
                        },
                        isAndroid:function(){// Detect the browser Mobile Chrome
                            var isAndroid = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('android') != -1){
                                isAndroid = true;
                            }
                            return isAndroid;
                        },
                        isTouchDevice:function(){// Detect touchscreen devices
                            var os = navigator.platform;
                            
                            if (os.toLowerCase().indexOf('win') != -1){
                                return window.navigator.msMaxTouchPoints;
                            }
                            else {
                                return 'ontouchstart' in document;
                            }
                        },

                        openLink:function(url, target){// Open a link
                            switch (target.toLowerCase()){
                                case '_blank':
                                    window.open(url);
                                    break;
                                case '_top':
                                    top.location.href = url;
                                    break;
                                case '_parent':
                                    parent.location.href = url;
                                    break;
                                default:    
                                    window.location = url;
                            }
                        },

                        validateCharacters:function(str, allowedCharacters){// Verify if a string contains allowed characters
                            var characters = str.split(''), i;

                            for (i=0; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) == -1){
                                    return false;
                                }
                            }
                            return true;
                        },
                        cleanInput:function(input, allowedCharacters, firstNotAllowed, min){// Remove characters that aren't allowed from a string
                            var characters = $(input).val().split(''),
                            returnStr = '', i, startIndex = 0;

                            if (characters.length > 1 && characters[0] == firstNotAllowed){
                                startIndex = 1;
                            }
                            
                            for (i=startIndex; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) != -1){
                                    returnStr += characters[i];
                                }
                            }
                                
                            if (min > returnStr){
                                returnStr = min;
                            }
                            
                            $(input).val(returnStr);
                        },
                        validEmail:function(email){// Validate email
                            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            
                            if (filter.test(email)){
                                return true;
                            }
                            return false;
                        },
                        
                        $_GET:function(variable){// Parse $_GET variables
                            var url = window.location.href.split('?')[1],
                            variables = url != undefined ? url.split('&'):[],
                            i; 
                            
                            for (i=0; i<variables.length; i++){
                                if (variables[i].indexOf(variable) != -1){
                                    return variables[i].split('=')[1];
                                    break;
                                }
                            }
                            
                            return undefined;
                        },
                        acaoBuster:function(dataURL){// Access-Control-Allow-Origin buster
                            var topURL = window.location.href,
                            pathPiece1 = '', pathPiece2 = '';
                            
                            if (dataURL.indexOf('https') != -1 || dataURL.indexOf('http') != -1){
                                if (topURL.indexOf('http://www.') != -1){
                                    pathPiece1 = 'http://www.';
                                }
                                else if (topURL.indexOf('http://') != -1){
                                    pathPiece1 = 'http://';
                                }
                                else if (topURL.indexOf('https://www.') != -1){
                                    pathPiece1 = 'https://www.';
                                }
                                else if (topURL.indexOf('https://') != -1){
                                    pathPiece1 = 'https://';
                                }
                                    
                                if (dataURL.indexOf('http://www.') != -1){
                                    pathPiece2 = dataURL.split('http://www.')[1];
                                }
                                else if (dataURL.indexOf('http://') != -1){
                                    pathPiece2 = dataURL.split('http://')[1];
                                }
                                else if (dataURL.indexOf('https://www.') != -1){
                                    pathPiece2 = dataURL.split('https://www.')[1];
                                }
                                else if (dataURL.indexOf('https://') != -1){
                                    pathPiece2 = dataURL.split('https://')[1];
                                }
                                
                                return pathPiece1+pathPiece2;
                            }
                            else{
                                return dataURL;
                            }
                        },
                        
                        doHideBuster:function(item){// Make all parents & current item visible
                            var parent = item.parent(),
                            items = new Array();
                                
                            if (item.prop('tagName') != undefined && item.prop('tagName').toLowerCase() != 'body'){
                                items = prototypes.doHideBuster(parent);
                            }
                            
                            if (item.css('display') == 'none'){
                                item.css('display', 'block');
                                items.push(item);
                            }
                            
                            return items;
                        },
                        undoHideBuster:function(items){// Hide items in the array
                            var i;
                            
                            for (i=0; i<items.length; i++){
                                items[i].css('display', 'none');
                            }
                        },
                       
                        setCookie:function(c_name, value, expiredays){// Set cookie (name, value, expire in no days)
                            var exdate = new Date();
                            exdate.setDate(exdate.getDate()+expiredays);

                            document.cookie = c_name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";javahere=yes;path=/";
                        },
                        readCookie:function(name){// Read cookie (name) 
                            var nameEQ = name+"=",
                            ca = document.cookie.split(";");

                            for (var i=0; i<ca.length; i++){
                                var c = ca[i];

                                while (c.charAt(0)==" "){
                                    c = c.substring(1,c.length);            
                                } 

                                if (c.indexOf(nameEQ) == 0){
                                    return unescape(c.substring(nameEQ.length, c.length));
                                } 
                            }
                            return null;
                        },
                        deleteCookie:function(c_name, path, domain){// Delete cookie (name, path, domain)
                            if (readCookie(c_name)){
                                document.cookie = c_name+"="+((path) ? ";path="+path:"")+((domain) ? ";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                            }
                        }
                    };

        return methods.init.apply(this);
    }
})(jQuery);