import Chart from 'chart.js';

const json = require('../data/data.json');


export const initialData = [];
export let table;

const projects = new Set();
const rate = [];

const TABLE_ID_NAME = '#transaction-table';
const LIST_CLASS = 'ul.project-list';
const CHOSEN_CLASS = ".chosen-select";
const RATE_CLASS = ".rate-list";

export default function init() {

    createTable();
    createMenu();
    createBarChart();
}

/* create table and fill initial data */
function createTable() {

    $.each(json, function (key, value) {
        let rowData = [];

        rowData.push(value.transaction.id);
        rowData.push(value.transaction.transfer_date);
        rowData.push(value.transaction.status);
        rowData.push(value.transaction.project.name);
        rowData.push(value.transaction.payment_method.name);
        rowData.push(value.user.id);
        rowData.push(value.payment_details.payment.amount);
        rowData.push(value.payment_details.payment.currency);

        initialData.push(rowData);

        projects.add(value.transaction.project.name);

        if (rate.hasOwnProperty(value.transaction.payment_method.name)) {
            rate[value.transaction.payment_method.name] += 1;
        }
        else rate[value.transaction.payment_method.name] = 1;
    });

    table = $(TABLE_ID_NAME).dataTable({
        data: initialData,
        searching: false,
        "columnDefs": [
            {"orderable": false, "targets": [2, 7]}
        ],
        "language": {
            "emptyTable": "No data available in table"
        }
    });
}

/* create payment system rate list and projects list */
function createMenu() {

    projects.forEach(project => {
        let li = $('<li/>')
            .appendTo($(LIST_CLASS));
        let aaa = $('<span/>')
            .text(project)
            .appendTo(li);
    });

    projects.forEach(currentProject => {
        $(CHOSEN_CLASS).append('<option value = ' + '\"'
            + currentProject + '\"' + '>' + currentProject + '</option>').trigger("chosen:updated");
    });

    const sum = Object.values(rate).reduce(function (sum, current) {
        return sum + current;
    }, 0);

    Object.keys(rate).sort((a, b) => rate[b] - rate[a]).forEach(item => {
        let percent = rate[item] / sum * 100;
        $(RATE_CLASS).append(
            '<li>' + '<span>' + item + '</span>' + '<span class = "percent-span">' + percent.toFixed() + '%' + '</span>' + '</li>');
    });
}

/* create payment system rate bar chart */
function createBarChart() {
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: Object.keys(rate),
            datasets: [
                {
                    data: Object.values(rate),
                    backgroundColor: ["#ff005b", "#426a9e", "#47adaa", "#e0eb69",
                        "#9cad45", "#ab37a5", "#283160", "#513484"],
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'amount'
                    }
                }]
            }
        }

    });
}