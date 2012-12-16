function mortgage() {


    // this.graph_data.push([ 'Date', 'Balance', 'Equity']);

    this.MortgageWriteRow = function (month) {
        var output;
        output =

            "<tr align=right>" +
                "<td>" + this.schedule[month].month + "</td>" +
                "<td>" + (this.schedule[month].amount / 100) + "</td>" +
                "<td>" + (this.schedule[month].principle / 100) + "</td>" +
                "<td>" + (this.schedule[month].interest / 100) + "</td>" +
                "<td>" + (this.schedule[month].remaining / 100) + "</td>" +
                "<td>" + (this.schedule[month].equity) + "</td>" +
                "</tr>"
        ;
        return output;
    }

    this.toUSCurrency = function (x) {
        return x
    }
    this.MortgageWriteSummary = function () {
        var output;
        output =

            "<table border>" +
                "<tr align=right>" +
                "<td>loan amount:</td>" +
                "<td>" + (this.principle / 100) + "</td>" +
                "</tr><tr align=right>" +
                "<td>interest rate:</td>" +
                "<td>" + this.rate + "%</td>" +
                "</tr><tr align=right>" +
                "<td>term:</td>" +
                "<td>" + this.term + " years</td>" +
                "</tr><tr align=right>" +
                "<td>monthly payment:</td>" +
                "<td>" + (this.monthly_payment / 100) + "</td>" +
                "</tr><tr align=right>" +
                "<td>total interest:</td>" +
                "<td>" + (this.total_interest / 100) + "</td>" +
                "</tr><tr align=right>" +
                "<td>total payment:</td>" +
                "<td>" + (this.total_payment / 100) + "</td>" +
                "</tr>" +
                "</table>"
        ;
        return output;
    }


    this.MortgageSummary = function () {
        var output;
        output = [
            ["Results",''],
                   [ "Loan Amount ",  accounting.formatMoney( (this.principle ) ) ],
                   [ "Interest Rate",  this.rate + '%' ],
                   [ "Term:", this.term + " yrs" ],
                   ["Monthly Payment", accounting.formatMoney( (this.monthly_payment / 100) ) ],
                   ["Total Interest" , accounting.formatMoney( (this.total_interest / 100) ) ],
                    ["Total Payment",  accounting.formatMoney( (this.total_payment / 100) ) ]
        ];

        return output;
    }


    this.MortgageRow = function (month) {

        var e =  accounting.formatMoney(this.schedule[month].equity);
        var output =  [
            this.schedule[month].month,
                accounting.formatMoney( (this.schedule[month].amount / 100)),
                    accounting.formatMoney(    (this.schedule[month].principle / 100)),
                        accounting.formatMoney( (this.schedule[month].interest / 100)),
                            accounting.formatMoney( (this.schedule[month].remaining / 100)),
         accounting.formatMoney(this.schedule[month].equity/100)
        ] ;
        return output;
    }

    this.MortgageWriteSchedule = function () {
        var output;
        var month;
        output = "<table border>";
        output += "<tr><th>month</th><th>payment</th><th>principle</th><th>interest</th><th>balance</th><th>equity</th></tr>";
        for (month = 1; this.schedule [month] != null; ++month) {
            output += this.MortgageWriteRow(month);
        }
        output += "<th>total</th><td>" + (this.total_payment / 100) + "</td><td>" + (this.principle / 100) + "</td><td>" + (this.total_interest / 100) + "</td>";
        output += "</table>";
        return output;
    }

    this.MortgageSchedule = function () {
        var output = new Array();
        var month;

        output.push( ['month','payment','principle','interest','balance','equity']);
        for (month = 1; this.schedule [month] != null; ++month) {
            output.push(this.MortgageRow(month));
        }
        output.push ([{v:0, f:'Total'}, accounting.formatMoney((this.total_payment / 100)), accounting.formatMoney((this.principle / 100)) , accounting.formatMoney((this.total_interest / 100)),{v:'0', f:''},{v:'0', f:''}]) ;

        return output;
    }

    this.Mortgage = function (principle, annual_interest_rate, years_to_pay) {

        this.graph_data = new Array();
        this.graph_data['date'] = new Array();
        this.graph_data['balance'] = new Array();
        this.graph_data['equity'] = new Array();
        this.principle = principle;
        principle = Math.round(principle*100);
        this.monthly_interest_rate = annual_interest_rate / (12 * 100);
        this.months_to_pay = Math.round(years_to_pay * 12);
        this.monthly_payment = Math.ceil(principle * this.monthly_interest_rate / (1 - Math.pow(1 + this.monthly_interest_rate, -this.months_to_pay)));

        this.schedule = new Array();
        var principle_remaining = principle;
        var month = 1;
        this.total_interest = 0;
        while (principle_remaining > 0) {
            this.schedule[month] = this.MortgagePayment(this.monthly_payment, this.monthly_interest_rate, month, principle_remaining);
            this.total_interest += this.schedule[month].interest;
            principle_remaining -= this.schedule[month].principle;
            ++month;
        }
        this.total_payment = principle + this.total_interest;


        this.rate = annual_interest_rate;
        this.term = years_to_pay;


    };

    this.MortgagePayment = function
        (monthly_payment, monthly_interest_rate, month, principle_remaining) {

        var payment = {interest:0, principal:0, amount:0, remaining:0, equity:0};
        payment.interest = Math.round(principle_remaining * monthly_interest_rate);
        payment.principle = monthly_payment - payment.interest;
        if (payment.principle > principle_remaining)
            payment.principle = principle_remaining;
        //payment.amount = payment.interest + payment.principle;
        payment.amount = monthly_payment;

        payment.remaining = principle_remaining - payment.principle;
        payment.equity = ( this.principle * 100 ) - payment.remaining;
        payment.month = month;
        //this . write_row = this.MortgageWriteRow;
        var date = new Date();
        var date_month = date.getMonth();
        var date_day = date.getDate();
        var date_year = date.getFullYear();
        var newDate = new Date(date_year, date_month + payment.month, date_day);
        this.graph_data.date.push( [month, newDate]);
        var pr = payment.remaining / 100;
        var pe = payment.equity / 100;
        this.graph_data.balance.push([newDate, pr]);
        this.graph_data.equity.push([newDate,pe]);
        return payment;
    };



}

