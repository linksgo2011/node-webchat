define(function(require, exports, module) {
    $(function() {
        $('.m-select').on('change', 'select', function() {
            var text = $(this).find(':selected').text();
            $(this).closest('.m-select').find('.select-text').text(text);
        });
    });
});