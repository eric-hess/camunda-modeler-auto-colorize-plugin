module.exports = function(electronApp, menuState) {
    return [
      {
        label: 'Open auto colorize settings',
        enabled: function() {
          return true;
        },
        action: function() {
          electronApp.emit('menu:action', 'emit-event', {
            type: 'auto-colorize-plugin:setting-open'
          });
        }
      }
    ];
};