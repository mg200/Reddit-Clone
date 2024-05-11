/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 91.75, "KoPercent": 8.25};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9175, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "feed"], "isController": false}, {"data": [0.75, 500, 1500, "HomePage"], "isController": false}, {"data": [1.0, 500, 1500, "HomePage-0"], "isController": false}, {"data": [0.755, 500, 1500, "HomePage-1"], "isController": false}, {"data": [1.0, 500, 1500, "feed-0"], "isController": false}, {"data": [1.0, 500, 1500, "feed-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2400, 198, 8.25, 297.3254166666661, 144, 1617, 180.0, 434.7000000000012, 977.5999999999985, 1437.9399999999987, 578.8712011577423, 740.5481186685962, 92.70984081041968], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["feed", 400, 0, 0.0, 338.8575, 290, 466, 330.0, 434.70000000000044, 451.0, 465.0, 148.47809948032665, 285.211349294729, 36.24953600593913], "isController": false}, {"data": ["HomePage", 400, 100, 25.0, 553.4824999999998, 301, 1617, 343.0, 1348.2000000000007, 1451.85, 1522.97, 108.10810810810811, 207.24239864864865, 25.548986486486484], "isController": false}, {"data": ["HomePage-0", 400, 0, 0.0, 205.42249999999981, 146, 373, 168.0, 319.0, 368.0, 372.0, 112.67605633802818, 40.71302816901409, 13.314260563380282], "isController": false}, {"data": ["HomePage-1", 400, 98, 24.5, 347.4600000000002, 146, 1245, 174.0, 1028.0, 1098.95, 1158.93, 120.33694344163658, 187.20385830324912, 14.219502105896511], "isController": false}, {"data": ["feed-0", 400, 0, 0.0, 161.71249999999992, 144, 284, 160.5, 173.0, 178.0, 187.0, 158.73015873015873, 57.973710317460316, 19.37624007936508], "isController": false}, {"data": ["feed-1", 400, 0, 0.0, 177.01750000000007, 144, 301, 165.0, 271.0, 286.0, 300.0, 157.0475068708284, 244.3131625441696, 19.170838241067923], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 1,267 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,473 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 866 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,416 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,431 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,312 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,396 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 856 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,066 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 871 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 906 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,617 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 876 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 519 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 638 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 802 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,034 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,029 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,240 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 628 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,426 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 747 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,116 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 675 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,508 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,300 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,046 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 697 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 908 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,098 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,332 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 812 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,213 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,143 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,126 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,245 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 626 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 841 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,078 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,518 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 883 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,059 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 536 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,104 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,101 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 700 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 822 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 970 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,133 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,438 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,351 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,181 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 992 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,005 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,491 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 821 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 800 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 734 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 978 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 806 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 563 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 543 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,481 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,531 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,444 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 569 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 564 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,073 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,113 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,423 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 961 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,026 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,259 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,497 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 810 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,404 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,443 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,234 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,151 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,449 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,122 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,520 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 913 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,000 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 885 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,492 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,074 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 656 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,093 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,472 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,099 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 602 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 952 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,350 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,205 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 660 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 875 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,064 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 577 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,023 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 664 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,375 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,365 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,110 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,152 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 545 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,159 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 592 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,271 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 560 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, 1.5151515151515151, 0.125], "isController": false}, {"data": ["The operation lasted too long: It took 1,179 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 686 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,489 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,132 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,070 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 969 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 550 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 900 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,479 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,301 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,055 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,097 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 813 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,452 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,169 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 857 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,258 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,050 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 501 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 937 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,095 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,149 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 912 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,194 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 957 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,403 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,432 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 986 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, 1.5151515151515151, 0.125], "isController": false}, {"data": ["The operation lasted too long: It took 1,085 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 947 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,040 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 899 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, 1.5151515151515151, 0.125], "isController": false}, {"data": ["The operation lasted too long: It took 848 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,062 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,124 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,201 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 755 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,114 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 682 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 993 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 522 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 966 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 805 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 853 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 879 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,192 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,145 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,115 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,359 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 878 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 1,475 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 580 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,105 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,028 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, 1.0101010101010102, 0.08333333333333333], "isController": false}, {"data": ["The operation lasted too long: It took 551 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,523 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,616 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 882 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,495 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,388 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 984 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,009 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,051 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 888 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,456 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,144 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,270 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}, {"data": ["The operation lasted too long: It took 1,061 milliseconds, but should not have lasted longer than 500 milliseconds.", 1, 0.5050505050505051, 0.041666666666666664], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2400, 198, "The operation lasted too long: It took 560 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, "The operation lasted too long: It took 986 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, "The operation lasted too long: It took 899 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, "The operation lasted too long: It took 1,416 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 1,396 milliseconds, but should not have lasted longer than 500 milliseconds.", 2], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["HomePage", 400, 100, "The operation lasted too long: It took 986 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, "The operation lasted too long: It took 1,416 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 1,396 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 822 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 899 milliseconds, but should not have lasted longer than 500 milliseconds.", 2], "isController": false}, {"data": [], "isController": false}, {"data": ["HomePage-1", 400, 98, "The operation lasted too long: It took 560 milliseconds, but should not have lasted longer than 500 milliseconds.", 3, "The operation lasted too long: It took 686 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 1,132 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 550 milliseconds, but should not have lasted longer than 500 milliseconds.", 2, "The operation lasted too long: It took 1,145 milliseconds, but should not have lasted longer than 500 milliseconds.", 2], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
