/**
 * fis.baidu.com
 */

var pth = require('path');
var prompt = require('prompt');
var info = deployInfo() || {};

function getServerInfo() {
    var conf = pth.join(fis.project.getTempPath('server'), 'conf.json');
    if (fis.util.isFile(conf)) {
        return fis.util.readJSON(conf);
    }
    return {};
}

var serverRoot = (function(){
    var key = 'FIS_SERVER_DOCUMENT_ROOT';
    var serverInfo = getServerInfo();
    if(process.env && process.env[key]){
        var path = process.env[key];
        if(fis.util.exists(path) && !fis.util.isDir(path)){
            fis.log.error('invalid environment variable [' + key + '] of document root [' + path + ']');
        }
        return path;
    } else if (serverInfo['root'] && fis.util.is(serverInfo['root'], 'String')) {
        return serverInfo['root'];
    } else {
        return fis.project.getTempPath('www');
    }
})();

var cwd = fis.processCWD || process.cwd();

function normalizePath(to, root){
    if(to[0] === '.'){
        to = fis.util(cwd + '/' +  to);
    } else if(/^output\b/.test(to)){
        to = fis.util(root + '/' +  to);
    } else if(to === 'preview'){
        to = serverRoot;
    } else {
        to = fis.util(to);
    }
    return to;
}

function deliver(output, release, content, file, callback){
    if(!release){
        fis.log.error('unable to get release path of file['
            + file.realpath
            + ']: Maybe this file is neither in current project or releasable');
    }
    if(fis.util.exists(output) && !fis.util.isDir(output)){
        fis.log.error('unable to deliver file['
            + file.realpath + '] to dir['
            + output + ']: invalid output dir.');
    }
    var target;
    target = fis.util(output, release);
    fis.util.write(target, content);
    fis.log.debug(
        'release ' +
        file.subpath.replace(/^\//, '') +
        ' >> '.yellow.bold +
        target
    );
    callback();
}

var quenue = null;
function requireEmail(settings, cb) {
    if (quenue) {
        return quenue.push(cb);
    }

    if (!settings.authApi) {
        return cb('config.authApi is Required');
    }

    if (info.token) {
        console.log('Token expired!');
    }

    quenue = [cb];
    prompt.get({
        properties: {
          email: {
            pattern: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            message: 'The specified value must be a valid email address.',
            description: 'Enter your email',
            required: true,
            default: info.email
          }
        }
      }, function(error, ret) {
        if (error) {
          return cb(error);
        }

        info.email = ret.email;
        deployInfo(info);

        fetch(settings.authApi, {
          email: ret.email
        }, function(error, ret) {
          if (error) {
            return cb(error);
          }

          console.log('We\'re already sent the code to your email.')

          requireToken(settings, callback);
        });
    })

    function callback(error, ret) {
        var arr = quenue;
        quenue = null;
        arr.forEach(function(fn) {
            fn(error, ret);
        });
    }
}

function requireToken(settings, cb) {
    if (!settings.validateApi) {
        return cb('config.authApi is Required');
    }
    prompt.get({
        properties: {
          code: {
            description: 'Enter your code',
            required: true,
            hide: true
          }
    }}, function(error, ret) {
        if (error) {
          return cb(error);
        }

        info.code = ret.code;
        deployInfo(info);

        fetch(settings.validateApi, {
          email: info.email,
          code: info.code
        }, function(error, ret) {
          if (error) {
            return cb(error);
          }

          info.token = ret.data.token;
          deployInfo(info);
          cb(null, info);
        });
    })
}

function fetch(url, data, callback) {
  var endl = '\r\n';
  var collect = [];
  var opt = {};

  fis.util.map(data, function(key, value) {
    collect.push(key + '=' + encodeURIComponent(value))
  });

  var content = collect.join('&');
  opt.method = opt.method || 'POST';
  opt.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  };
  opt = fis.util.parseUrl(url, opt);
  var http = opt.protocol === 'https:' ? require('https') : require('http');
  var req = http.request(opt, function(res) {
    var status = res.statusCode;
    var body = '';
    res
      .on('data', function(chunk) {
        body += chunk;
      })
      .on('end', function() {
        if (status >= 200 && status < 300 || status === 304) {
          var json = null;
          try {json = JSON.parse(body);} catch(e) {};

          if (!json || json.errno) {
            callback(json || 'The response is not valid json string.')
          } else {
            callback(null, json);
          }
        } else {
          callback(status);
        }
      })
      .on('error', function(err) {
        callback(err.message || err);
      });
  });
  req.write(content);
  req.end();
}

function upload(receiver, to, release, content, file, callback, settings){
    var subpath = file.subpath;
    fis.util.upload(
        //url, request options, post data, file
        receiver, null, { to : to + release, email: info.email, token: info.token }, content, subpath,
        function(err, res){
            var json = null;
            try {
              json = res ? JSON.parse(res) : null;
            } catch (e) {}

            if (!err && json && json.errno) {
                if (json.errno === 100302 || json.errno === 100305) {
                    requireEmail(settings, function(error, info) {
                        if (error) {
                            return fis.log.error('upload file [' + subpath + '] to [' + to +
                            '] by receiver [' + receiver + '] error [' + error.errmsg + ']');
                        }

                        upload(receiver, to, release, content, file, callback, settings);
                      });
                } else {
                    fis.log.error('Server Error: ' + json.errmsg);
                }
            } else if(err || !json && res.trim() != '0'){
                fis.log.error('upload file [' + subpath + '] to [' + to +
                    '] by receiver [' + receiver + '] error [' + (err || res) + ']');
            } else {
                var time = '[' + fis.log.now(true) + ']';
                process.stdout.write(
                    ' - '.green.bold +
                    time.grey + ' ' + 
                    subpath.replace(/^\//, '') +
                    ' >> '.yellow.bold +
                    to + release +
                    '\n'
                );
                callback();
            }
        }
    );
}

function getTmpFile() {
  return fis.project.getTempPath('deploy.json');
}

function deployInfo(options) {
  var conf = getTmpFile();

  if (arguments.length) {
    // setter
    return options && fis.util.write(conf, JSON.stringify(options, null, 2));
  } else {
    var ret = null;

    try {
      // getter
      ret = fis.util.isFile(conf) ? require(conf) : null;
    } catch (e) {

    }
    return ret;
  }
};

module.exports = function (dest, file, content, settings, callback) {
    var root = fis.project.getProjectPath();
    var to = normalizePath(dest.to, root);

    if (settings.host) {
        settings.receiver = settings.host + '/v1/upload';
        settings.authApi = settings.host + '/v1/authorize';
        settings.validateApi = settings.host + '/v1/validate';
    }

    if(settings && settings.receiver) {
        upload(settings.receiver, to, dest.release, content, file, callback, settings);
    } else {
        deliver(to, dest.release, content, file, callback);
    }
};
