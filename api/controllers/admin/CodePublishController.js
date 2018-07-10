/**
 * 代码发布辅助工具,TODO 开发完成需要关闭此功能，并且需要认证权限
 *
 * @description :: Server-side logic for managing userrelevances
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var process = require('child_process');

module.exports = {
    index: function(req, res) {
        if(req.query.pwd !== "7499ac2248f78a62732406e373268398"){
            return res.end("badRequest");
        }
        res.view();
    },
    upload: function(req, res) {
        req.file('code').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            var cmd = 'mv ' + uploadedFiles[0].fd + ' /home/dili/node/node_webchat.zip ';
            process.exec(cmd,
                function(error, stdout, stderr) {
                    if (!error) {
                        return res.end("noError");
                    }
                    return res.json(error);
                });

        });
    }
};