var xhr_proxy_output;
var default_url = "http://saggar.in/public/json-object.json";
default_url = "http://saggar.in/public/json-array.json";

$(document).ready(function() {
    // Set the default URL
    $('#url_input').val(default_url);

    // On click handler
    $('#url_input_btn').click(function(event) {
        event.preventDefault();
        var URL = $('#url_input').val();

        // Set xhr_proxy_output via async call
        xhr_proxy(URL);
        render_json_to_table(xhr_proxy_output, 'table_url_to_table', '#aggregate_tables');  
        
        // Enable table sorter using table ID
        $('#table_url_to_table').tablesorter(); 
    });
});

function render_json_to_table(xhr_proxy_output, table_container_id, aggregate_tables_id) {
    var jsonHtmlTable;
    
    if(xhr_proxy_output instanceof Array){
        jsonHtmlTable = ConvertJsonToTable(xhr_proxy_output, table_container_id, null, 'Numbers');
    } else {
        jsonHtmlTable = ConvertJsonKeyValueToTable(xhr_proxy_output, table_container_id);
    }
    $(aggregate_tables_id).append(add_table(jsonHtmlTable));
}

function ConvertJsonKeyValueToTable(xhr_proxy_output, table_container_id) {
    var column_names = '<th>Date</th><th>Value</th>';
    var template = '<table class="table table-bordered" id="' + table_container_id + '"><thead><tr>'+ column_names + '</tr></thead>';
    template += '<tbody>';

    var keys = [];
    for (var key in xhr_proxy_output) {
        keys.push(key);
    }
    keys.sort();

    for(var i=0; i<keys.length; i++) {
        template += '<tr><td>' + keys[i] + '</td><td>' + xhr_proxy_output[keys[i]] + '</td></tr>';
    }
    template += '</tbody></table>';
    return template;
}

function add_table(content) {
    var table_container = '<div class="span12"><div>' + content + '</div></div>';
    return table_container;
}

function xhr_proxy(URL) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            xhr_proxy_output = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
}