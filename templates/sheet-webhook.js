/**
 * REBELLE STORE — Google Apps Script Webhook
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file
 * 4. Save (Ctrl+S)
 * 5. Click "Deploy" → "New deployment"
 * 6. Type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy → Authorize → Copy the Web App URL
 * 10. Paste the URL as SHEETS_WEBHOOK_URL in your backend .env
 *
 * Sheet columns (auto-created on first request):
 * A: Order ID | B: Date | C: Time | D: Prénom | E: Téléphone
 * F: Produit(s) | G: Offre | H: Quantité | I: Sous-total
 * J: Upsell | K: Total | L: Statut | M: UTM Source | N: UTM Medium
 * O: UTM Campaign | P: IP | Q: FBC | R: FBP | S: TTCLID
 */

const SHEET_NAME = 'Commandes';
const SECRET_KEY = 'rebelle2026'; // Set same value in backend env SHEETS_SECRET

function doPost(e) {
  try {
    // Parse incoming JSON
    var body = JSON.parse(e.postData.contents);

    // Optional secret validation
    if (body.secret && body.secret !== SECRET_KEY) {
      return jsonResponse({ success: false, error: 'Unauthorized' });
    }

    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      createHeaders(sheet);
    }

    // Check if headers exist (first row)
    if (sheet.getLastRow() === 0) {
      createHeaders(sheet);
    }

    // Format date/time in Morocco timezone
    var now = new Date();
    var options = { timeZone: 'Africa/Casablanca' };
    var dateStr = Utilities.formatDate(now, 'Africa/Casablanca', 'dd/MM/yyyy');
    var timeStr = Utilities.formatDate(now, 'Africa/Casablanca', 'HH:mm:ss');

    // Format items
    var itemsText = '';
    if (body.items && Array.isArray(body.items)) {
      itemsText = body.items.map(function(item) {
        return item.product_name + ' (x' + (item.quantity || 1) + ')';
      }).join(' + ');
    }

    // Format offer
    var offerMap = {
      '1piece':  '1 sac',
      '2pieces': '2 sacs',
      '3pieces': '3 sacs',
    };
    var offerText = offerMap[body.offer_type] || body.offer_type || '—';

    // Build row
    var row = [
      body.order_id          || '',       // A: Order ID
      dateStr,                            // B: Date
      timeStr,                            // C: Time
      body.name              || '',       // D: Prénom
      body.phone             || '',       // E: Téléphone
      itemsText,                          // F: Produit(s)
      offerText,                          // G: Offre
      body.total_quantity    || '',       // H: Quantité totale
      body.subtotal          || 0,        // I: Sous-total
      body.upsell_accepted ? (body.upsell_amount || 469) : 0, // J: Upsell
      body.total             || 0,        // K: Total DH
      'En attente',                       // L: Statut (default)
      body.utm_source        || '',       // M: UTM Source
      body.utm_medium        || '',       // N: UTM Medium
      body.utm_campaign      || '',       // O: UTM Campaign
      body.client_ip         || '',       // P: IP
      body.fbc               || '',       // Q: FBC
      body.fbp               || '',       // R: FBP
      body.ttclid            || '',       // S: TTCLID
    ];

    sheet.appendRow(row);

    // Auto-format the new row
    var lastRow = sheet.getLastRow();
    formatRow(sheet, lastRow);

    return jsonResponse({ success: true, row: lastRow });

  } catch (err) {
    console.error('Webhook error:', err.toString());
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet(e) {
  // Health check endpoint
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Rebelle Orders Webhook' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createHeaders(sheet) {
  var headers = [
    '📦 Order ID',
    '📅 Date',
    '🕐 Heure',
    '👤 Prénom',
    '📱 Téléphone',
    '🛍️ Produit(s)',
    '🎁 Offre',
    '🔢 Qté',
    '💵 Sous-total',
    '⬆️ Upsell',
    '💰 Total (DH)',
    '🚦 Statut',
    '📣 UTM Source',
    '📣 UTM Medium',
    '📣 UTM Campaign',
    '🌐 IP',
    '🔵 FBC',
    '🔵 FBP',
    '🎵 TTCLID',
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#810B38');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Set column widths
  sheet.setColumnWidth(1, 130);  // Order ID
  sheet.setColumnWidth(2, 100);  // Date
  sheet.setColumnWidth(3, 80);   // Heure
  sheet.setColumnWidth(4, 120);  // Prénom
  sheet.setColumnWidth(5, 130);  // Téléphone
  sheet.setColumnWidth(6, 300);  // Produit(s)
  sheet.setColumnWidth(7, 100);  // Offre
  sheet.setColumnWidth(8, 60);   // Qté
  sheet.setColumnWidth(9, 100);  // Sous-total
  sheet.setColumnWidth(10, 80);  // Upsell
  sheet.setColumnWidth(11, 100); // Total
  sheet.setColumnWidth(12, 120); // Statut
}

function formatRow(sheet, rowNum) {
  var totalCol    = 11; // K
  var statusCol   = 12; // L

  // Format total as number
  sheet.getRange(rowNum, totalCol).setNumberFormat('#,##0.00 "DH"');
  sheet.getRange(rowNum, 9).setNumberFormat('#,##0.00 "DH"'); // sous-total
  sheet.getRange(rowNum, 10).setNumberFormat('#,##0.00 "DH"'); // upsell

  // Color status cell
  var statusCell = sheet.getRange(rowNum, statusCol);
  statusCell.setBackground('#FFF3CD'); // yellow for "En attente"
  statusCell.setFontColor('#856404');

  // Alternating row colors
  if (rowNum % 2 === 0) {
    sheet.getRange(rowNum, 1, 1, 12).setBackground('#FDF5F8');
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────
// HELPER: Update order status from sheet
// Run manually or create a trigger
// ─────────────────────────────────────────────
function updateOrderStatus(orderId, newStatus) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var statusColors = {
    'En attente':  { bg: '#FFF3CD', fg: '#856404' },
    'Confirmée':   { bg: '#D1ECF1', fg: '#0C5460' },
    'Expédiée':    { bg: '#CCE5FF', fg: '#004085' },
    'Livrée':      { bg: '#D4EDDA', fg: '#155724' },
    'Annulée':     { bg: '#F8D7DA', fg: '#721C24' },
  };

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      var statusCell = sheet.getRange(i + 1, 12);
      statusCell.setValue(newStatus);
      var colors = statusColors[newStatus] || { bg: '#FFFFFF', fg: '#000000' };
      statusCell.setBackground(colors.bg);
      statusCell.setFontColor(colors.fg);
      break;
    }
  }
}
