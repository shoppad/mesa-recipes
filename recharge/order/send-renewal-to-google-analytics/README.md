# Recharge - Send renewal to Google Analytics.

On Recharge successful order renewal creation, send client ID data to Google Analytics.

## Setup

### Insert snippet for analytics to be added to checkouts in recharge

Add this snippet to cart.liquid, inside the `<form>` tag, to capture the GA client ID on checkout
```
  <!-- Mesa by ShopPad - BEGIN GA client ID snippet -->
  <input id="cid" type="hidden" name="attributes[cid]" />

  <script>
    ga(function(tracker) {
      var clientId = tracker.get('clientId');
      if (clientId) {
        $('#cid').val(clientId); 
      }
    });
  </script>
  <!-- Mesa by ShopPad - END GA client ID snippet -->
```

### Recharge

Authorize the recharge application using the credential form