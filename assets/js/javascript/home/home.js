/**
 * founder : zzf
 * Creation time :  2015/2/9
 * note :
 * role :
 */
define(function( require, exports, module ) {

    $(".user-logout").click(function(){
        $(this).addClass("user-logout-am");
        return false;
    }).one('webkitAnimationEnd', function(){
        $(this).hide();
        $(".user-login").show();
        $(".user-login").addClass("user-login-am");
    });
});