/**
 * REBELLE STORE — Google Apps Script webhook (no secret, just the link)
 *
 * SETUP (one-time, takes 2 minutes):
 *   1. Open your Google Sheet
 *   2. Extensions → Apps Script
 *   3. Replace the default file with everything in this file
 *   4. Save (Ctrl+S)
 *   5. Deploy → New deployment
 *        Type     : Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   6. Click Deploy → Authorize → copy the Web App URL
 *   7. Paste that URL in the backend env as SHEETS_WEBHOOK_URL
 *
 * Receives a POST JSON body from the backend with exactly 11 fields
 * (status is always sent empty and filled in by ops in the sheet):
 *
 *   {
 *     "date":     "28/05/2026",
 *     "order_id": "rebelle-260528-4827",
 *     "country":  "MA",
 *     "name":     "Fatima Z.",
 *     "phone":    "212673662987",
 *     "product":  "Tabby Cognac Shoulder Bag/Marmont Black Matelasse",
 *     "sku":      "RBL-TABBY-COG/RBL-MARMONT-NOI",
 *     "quantity": "2/3",
 *     "total":    1199,
 *     "currency": "MAD",
 *     "status":   ""
 *   }
 *
 * Writes one row per request, columns in this exact order:
 *   A Date | B Order ID | C Country | D Name | E Phone
 *   F Product | G SKU | H Quantity | I Total | J Currency | K Status
 */

var SHEET_NAME = 'Orders';

var HEADERS = [
  'Date',
  'Order ID',
  'Country',
  'Name',
  'Phone',
  'Product',
  'SKU',
  'Quantity',
  'Total',
  'Currency',
  'Status',
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      writeHeaders(sheet);
    }

    var row = [
      body.date || '',
      body.order_id || '',
      body.country || 'MA',
      body.name || '',
      // Force phone as plain text so Sheets never strips the leading 0
      // or converts long numbers to scientific notation.
      "'" + (body.phone || ''),
      body.product || '',
      body.sku || '',
      body.quantity || '',
      body.total != null ? body.total : '',
      body.currency || 'MAD',
      body.status || '',
    ];

    sheet.appendRow(row);

    var lastRow = sheet.getLastRow();
    formatRow(sheet, lastRow);

    return jsonResponse({ success: true, row: lastRow });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

// GET is just a health check so you can paste the URL in a browser and
// see {status: "ok"} to confirm the deployment is live.
function doGet() {
  return jsonResponse({ status: 'ok', service: 'Rebelle Orders Webhook' });
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function writeHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground('#810B38');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  sheet.setFrozenRows(1);

  // Reasonable column widths for the 11 fields
  var widths = [90, 170, 70, 140, 130, 280, 220, 90, 100, 80, 110];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

function formatRow(sheet, rowNum) {
  // Total — number with thousands separator + MAD suffix preserved in
  // a sibling column, so number-format the Total cell as plain integer.
  sheet.getRange(rowNum, 9).setNumberFormat('#,##0');

  // Status default styling (yellow until ops sets a real value)
  var statusCell = sheet.getRange(rowNum, 11);
  if (!statusCell.getValue()) {
    statusCell.setBackground('#FFF3CD');
    statusCell.setFontColor('#856404');
  }

  // Zebra striping
  if (rowNum % 2 === 0) {
    sheet.getRange(rowNum, 1, 1, HEADERS.length).setBackground('#FDF5F8');
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ──────────────────────────────────────────────
// Optional: manual status updater (run from Apps Script editor)
// ──────────────────────────────────────────────
function updateOrderStatus(orderId, newStatus) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  var colors = {
    'En attente': { bg: '#FFF3CD', fg: '#856404' },
    'Confirmée':  { bg: '#D1ECF1', fg: '#0C5460' },
    'Expédiée':   { bg: '#CCE5FF', fg: '#004085' },
    'Livrée':     { bg: '#D4EDDA', fg: '#155724' },
    'Annulée':    { bg: '#F8D7DA', fg: '#721C24' },
  };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === orderId) {
      var statusCell = sheet.getRange(i + 1, 11);
      statusCell.setValue(newStatus);
      var c = colors[newStatus] || { bg: '#FFFFFF', fg: '#000000' };
      statusCell.setBackground(c.bg);
      statusCell.setFontColor(c.fg);
      break;
    }
  }
}
